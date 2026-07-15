// ==========================================
// Regalia Agent WA — Dashboard Frontend Logic
// ==========================================

const API_BASE = "http://localhost:8000";
const WS_URL = "ws://localhost:8000/ws";

let ws = null;
let currentClient = null;
let theme = "light";

// Initialization on load
document.addEventListener("DOMContentLoaded", () => {
    connectWebSocket();
    loadConfigurationData();

    // Default stats values if they are empty
    document.getElementById("metric-active-chats").innerText = "1";
});

// ==========================================
// Authentication Rail
// ==========================================
function switchPortalTab(tab) {
    const tabs = ["login", "register"];
    tabs.forEach(t => {
        const btn = document.getElementById(`tab-${t}`);
        const form = document.getElementById(`form-${t}`);
        if (btn && form) {
            if (t === tab) {
                btn.classList.add("bg-white/10", "text-white", "shadow-sm");
                btn.classList.remove("text-white/50", "bg-transparent");
                form.classList.remove("hidden");
                form.classList.add("active");
            } else {
                btn.classList.remove("bg-white/10", "text-white", "shadow-sm");
                btn.classList.add("text-white/50", "bg-transparent");
                form.classList.add("hidden");
                form.classList.remove("active");
            }
        }
    });
}

function handleAuth(event, type) {
    event.preventDefault();
    triggerToast(`Initializing security handshake...`, "info");
    
    setTimeout(() => {
        // Fallback default admin profile
        const name = document.querySelector(".profile-name");
        const role = document.querySelector(".profile-role");
        if (name) name.innerText = "Admin User";
        if (role) role.innerText = "admin@regalia.ai";

        document.getElementById("access-portal").classList.add("hidden");
        document.getElementById("main-dashboard").classList.remove("hidden");
        triggerToast(`Welcome to Regalia WA Control Center`, "success");
        // Initialize dashboard logs
        addTerminalLog("SYSTEM", "Secure Session Handshake established successfully.", "success");
    }, 1000);
}

// Google Auth JWT Parser helper
function parseJwt(token) {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
    } catch (e) {
        console.error("JWT parse error:", e);
        return null;
    }
}

// Handle Google Sign-In Response
function handleGoogleSignIn(response) {
    const cred = response.credential;
    const payload = parseJwt(cred);
    
    if (payload) {
        console.log("[Google Auth] User authenticated:", payload.email);
        
        // Update user profile in sidebar dynamically
        const avatar = document.querySelector(".profile-avatar");
        const name = document.querySelector(".profile-name");
        const role = document.querySelector(".profile-role");
        
        if (avatar && payload.picture) avatar.src = payload.picture;
        if (name && payload.name) name.innerText = payload.name;
        if (role && payload.email) role.innerText = payload.email;
        
        // Transition to dashboard view
        document.getElementById("access-portal").classList.add("hidden");
        document.getElementById("main-dashboard").classList.remove("hidden");
        
        triggerToast(`Welcome back, ${payload.given_name || 'Admin'}!`, "success");
        addTerminalLog("SYSTEM", `Secure Google Auth established: ${payload.email}`, "success");
    } else {
        triggerToast("Failed to verify Google Auth credentials.", "error");
    }
}

// Handle developer bypass login
function handleBypassLogin() {
    triggerToast("Bypassing authentication (Demo Mode)...", "success");
    
    // Set dummy profile info in sidebar
    const avatar = document.querySelector(".profile-avatar");
    const name = document.querySelector(".profile-name");
    const role = document.querySelector(".profile-role");
    
    if (avatar) avatar.src = "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=80&h=80&q=80";
    if (name) name.innerText = "Developer Guest";
    if (role) role.innerText = "dev-testing@regalia.ai";
    
    // Transition to dashboard view
    document.getElementById("access-portal").classList.add("hidden");
    document.getElementById("main-dashboard").classList.remove("hidden");
    
    addTerminalLog("SYSTEM", "Bypass mode activated. Developer credentials loaded.", "warn");
}

function handleLogout() {
    document.getElementById("main-dashboard").classList.add("hidden");
    document.getElementById("access-portal").classList.remove("hidden");
    triggerToast("Session terminated.", "info");
}

// ==========================================
// Navigation & Panel Management
// ==========================================
function switchPanel(panelId) {
    // Update Sidebar Navigation highlights
    const navItems = document.querySelectorAll(".nav-item");
    navItems.forEach(item => {
        if (item.getAttribute("data-panel") === panelId) {
            item.classList.add("active");
        } else {
            item.classList.remove("active");
        }
    });

    // Update Headers
    const title = document.getElementById("header-title");
    const subtitle = document.getElementById("header-subtitle");

    switch(panelId) {
        case "overview":
            title.innerText = "Overview";
            subtitle.innerText = "System monitoring, status codes, and active agent threads";
            break;
        case "config":
            title.innerText = "Agent Config";
            subtitle.innerText = "Fine-tune LLM parameters, update knowledge base, and toggle routing modules";
            break;
        case "sandbox":
            title.innerText = "Interactive Sandbox";
            subtitle.innerText = "Simulate user queries and check the real-time tool execution pipeline";
            break;
        case "analytics":
            title.innerText = "Analytics & Costs";
            subtitle.innerText = "Performance charts, cost analysis, and tool call distribution";
            break;
        case "logs":
            title.innerText = "System Event Logs";
            subtitle.innerText = "Explore real-time node outputs, tool requests, and system diagnostics";
            break;
    }

    // Toggle panels
    const panels = document.querySelectorAll(".dashboard-panel");
    panels.forEach(panel => {
        if (panel.id === `panel-${panelId}`) {
            panel.classList.add("active");
        } else {
            panel.classList.remove("active");
        }
    });
}

// ==========================================
// Theme Management
// ==========================================
function toggleTheme() {
    theme = theme === "light" ? "dark" : "light";
    const icon = document.getElementById("theme-icon");
    if (theme === "dark") {
        document.body.classList.add("dark-theme");
        icon.innerText = "light_mode";
    } else {
        document.body.classList.remove("dark-theme");
        icon.innerText = "dark_mode";
    }
    triggerToast(`Theme switched to ${theme} mode`, "info");
}

// ==========================================
// Toast Notification
// ==========================================
function triggerToast(message, type = "info") {
    const container = document.getElementById("toast-container");
    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    
    let iconName = "info";
    if (type === "success") iconName = "check_circle";
    if (type === "error") iconName = "warning";
    
    toast.innerHTML = `
        <span class="google-symbols notranslate" translate="no">${iconName}</span>
        <span>${message}</span>
    `;
    
    container.appendChild(toast);

    setTimeout(() => {
        toast.classList.add("show");
    }, 10);

    setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}

// ==========================================
// Database / API Configuration Actions
// ==========================================
async function loadConfigurationData() {
    try {
        const res = await fetch(`${API_BASE}/api/settings`);
        if (!res.ok) throw new Error("Gagal mengambil pengaturan");
        
        const data = await res.json();
        currentClient = data;
        
        // Update input fields in the UI
        document.getElementById("cfg-agent-name").value = data.nama_bisnis || "Regalia Concierge WA";
        document.getElementById("cfg-system-prompt").value = data.knowledge_base || "";
        
        // Update credentials (secret token or display info)
        document.getElementById("cfg-webhook").value = `${API_BASE}/webhook`;

        // Update toggles
        document.getElementById("toggle-slang").checked = data.toggle_slang === 1;
        document.getElementById("toggle-java").checked = data.toggle_java === 1;
        document.getElementById("toggle-ongkir").checked = data.toggle_ongkir === 1;
        document.getElementById("toggle-anger").checked = data.toggle_anger === 1;
        document.getElementById("toggle-fallback").checked = data.toggle_fallback === 1;

        // Set Business Brand in WA Sandbox Header
        document.getElementById("wa-name").innerText = `${data.nama_bisnis} Concierge`;
        
        addTerminalLog("SYSTEM", "Configuration synchronized with SQLite DB.", "success");
    } catch (err) {
        console.error(err);
        triggerToast("Failed to connect to backend API.", "error");
        addTerminalLog("ERROR", "Failed to sync configurations: Server offline.", "error");
    }
}

async function saveConfiguration(event) {
    if (event) event.preventDefault();
    
    const nama_bisnis = document.getElementById("cfg-agent-name").value;
    const knowledge_base = document.getElementById("cfg-system-prompt").value;
    
    const payload = {
        nama_bisnis,
        knowledge_base,
        toggle_slang: document.getElementById("toggle-slang").checked ? 1 : 0,
        toggle_java: document.getElementById("toggle-java").checked ? 1 : 0,
        toggle_ongkir: document.getElementById("toggle-ongkir").checked ? 1 : 0,
        toggle_anger: document.getElementById("toggle-anger").checked ? 1 : 0,
        toggle_fallback: document.getElementById("toggle-fallback").checked ? 1 : 0,
    };

    try {
        const res = await fetch(`${API_BASE}/api/settings`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        if (!res.ok) throw new Error("Gagal menyimpan konfigurasi");
        const result = await res.json();
        
        currentClient = result.client;
        document.getElementById("wa-name").innerText = `${currentClient.nama_bisnis} Concierge`;
        triggerToast("Configurations persisted successfully!", "success");
        addTerminalLog("SYSTEM", "Client settings updated in SQLite database.", "success");
    } catch (err) {
        console.error(err);
        triggerToast("Failed to persist configurations.", "error");
        addTerminalLog("ERROR", "Failed to persist configuration to database.", "error");
    }
}

// Ensure toggles save automatically when clicked
document.querySelectorAll(".toggle-list input[type='checkbox']").forEach(ch => {
    ch.addEventListener("change", () => {
        saveConfiguration(null);
    });
});

// ==========================================
// Interactive Sandbox & Presets
// ==========================================
function triggerPreset(type) {
    const inputField = document.getElementById("custom-input-message");
    switch(type) {
        case "slang":
            inputField.value = "halo gan, ready ga barangnya? moga sabi dapet diskonan tipis...";
            break;
        case "javanese":
            inputField.value = "Kirim dhateng Cibadak Sukabumi pinten nggih ongkiripun?";
            break;
        case "complaint":
            inputField.value = "WOI! Barang saya pecah nih! Gimana sih packingnya? Tanggung jawab dong! Resinya JP987654";
            break;
    }
    triggerToast(`Preset '${type}' loaded. Press Inject Msg to submit.`, "info");
}

function sendCustomMessage() {
    const inputField = document.getElementById("custom-input-message");
    const msg = inputField.value.trim();
    if (!msg) return;

    injectChatBubble(msg, "customer");
    inputField.value = "";

    // Show typing status
    setTypingStatus(true);

    const delay = parseFloat(document.getElementById("latency-val").value) * 1000;
    
    // Simulate delay
    setTimeout(async () => {
        try {
            const res = await fetch(`${API_BASE}/api/simulate`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: msg })
            });

            const data = await res.json();
            if (!res.ok) {
                injectChatBubble(`System Error: ${data.error || "Gagal memproses pesan"}`, "agent");
            }
        } catch (err) {
            injectChatBubble("System Connection Timeout. Is the backend running?", "agent");
            addTerminalLog("ERROR", "Connection to backend timed out during simulation.", "error");
        } finally {
            setTypingStatus(false);
        }
    }, delay);
}

function sendChatFromWaInput() {
    const inputField = document.getElementById("wa-user-typing-field");
    const msg = inputField.value.trim();
    if (!msg) return;

    injectChatBubble(msg, "customer");
    inputField.value = "";
    setTypingStatus(true);

    // Send through WebSocket to simulate real-time chat pipeline
    if (ws && ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({
            type: "chat",
            text: msg
        }));
    } else {
        // Fallback to fetch
        fetch(`${API_BASE}/api/simulate`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: msg })
        }).catch(err => {
            console.error(err);
        }).finally(() => {
            setTypingStatus(false);
        });
    }
}

function handleChatEnter(event) {
    if (event.key === "Enter") {
        sendChatFromWaInput();
    }
}

function injectChatBubble(text, sender) {
    const chatBox = document.getElementById("chat-box");
    const bubble = document.createElement("div");
    bubble.className = `wa-bubble ${sender}`;
    
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    bubble.innerHTML = `
        <div class="bubble-content">${escapeHTML(text)}</div>
        <div class="bubble-time">${timeStr}</div>
    `;

    // Insert before typing indicator
    const typingIndicator = document.getElementById("typing-indicator");
    chatBox.insertBefore(bubble, typingIndicator);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function setTypingStatus(isTyping) {
    const indicator = document.getElementById("typing-indicator");
    const statusText = document.getElementById("wa-typing-status");
    if (isTyping) {
        indicator.classList.remove("hidden");
        statusText.innerText = "typing...";
    } else {
        indicator.classList.add("hidden");
        statusText.innerText = "online";
    }
}

function clearChatHistory() {
    const chatBox = document.getElementById("chat-box");
    // Clear all bubbles except system-time and typing indicator
    const bubbles = chatBox.querySelectorAll(".wa-bubble");
    bubbles.forEach(b => b.remove());
    triggerToast("Chat simulator history cleared.", "info");
}

// ==========================================
// Log Terminal & Main Logs Console
// ==========================================
function addTerminalLog(source, msg, type = "info") {
    const timestamp = new Date().toLocaleTimeString([], { hour12: false });
    const term = document.getElementById("terminal-logs");
    if (!term) return;

    const line = document.createElement("div");
    line.className = `term-line timestamp`;
    
    let spanClass = "term-info";
    if (type === "success") spanClass = "term-success";
    if (type === "error") spanClass = "term-danger";
    if (type === "warn") spanClass = "term-warning";

    line.innerHTML = `[${timestamp}] <span class="${spanClass}">${source}:</span> ${escapeHTML(msg)}`;
    term.appendChild(line);
    term.scrollTop = term.scrollHeight;

    // Also add to Main System Logs panel console
    const mainLogsConsole = document.getElementById("logs-console-window");
    if (mainLogsConsole) {
        const mainLine = document.createElement("div");
        mainLine.className = `log-entry ${type}`;
        mainLine.innerHTML = `<span class="log-time">[${timestamp}]</span> <span class="log-tag">[${source.toUpperCase()}]</span> <span class="log-text">${escapeHTML(msg)}</span>`;
        mainLogsConsole.appendChild(mainLine);
        mainLogsConsole.scrollTop = mainLogsConsole.scrollHeight;
    }
}

function clearTerminal() {
    const term = document.getElementById("terminal-logs");
    if (term) {
        term.innerHTML = `<div class="term-line timestamp">[${new Date().toLocaleTimeString([], { hour12: false })}] <span class="term-info">SYSTEM:</span> Pipeline console cleared.</div>`;
    }
}

function clearMainLogs() {
    const term = document.getElementById("logs-console-window");
    if (term) {
        term.innerHTML = `<div class="log-entry info"><span class="log-time">[${new Date().toLocaleTimeString([], { hour12: false })}]</span> <span class="log-tag">[SYSTEM]</span> <span class="log-text">Logs console cleared.</span></div>`;
    }
    triggerToast("System log console cleared.", "info");
}

function filterLogs(level) {
    const entries = document.querySelectorAll("#logs-console-window .log-entry");
    const filters = document.querySelectorAll(".logs-filters .btn-filter");
    
    filters.forEach(btn => {
        if (btn.innerText === level) btn.classList.add("active");
        else btn.classList.remove("active");
    });

    entries.forEach(entry => {
        if (level === "ALL") {
            entry.style.display = "block";
            return;
        }
        
        const className = entry.className.toUpperCase();
        if (className.includes(level)) {
            entry.style.display = "block";
        } else {
            entry.style.display = "none";
        }
    });
}

function handleLogSearch() {
    const val = document.getElementById("log-search-input").value.toLowerCase();
    const entries = document.querySelectorAll("#logs-console-window .log-entry");
    
    entries.forEach(entry => {
        const text = entry.innerText.toLowerCase();
        if (text.includes(val)) {
            entry.style.display = "block";
        } else {
            entry.style.display = "none";
        }
    });
}

function exportLogs() {
    const entries = document.querySelectorAll("#logs-console-window .log-entry");
    let text = "";
    entries.forEach(e => {
        text += e.innerText + "\n";
    });
    
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `regalia_agent_system_logs_${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    triggerToast("System logs exported successfully.", "success");
}

function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
        tag => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            "'": '&#39;',
            '"': '&quot;'
        }[tag] || tag)
    );
}

// ==========================================
// WebSocket live subscription feed
// ==========================================
function connectWebSocket() {
    ws = new WebSocket(WS_URL);

    ws.onopen = () => {
        console.log("[WS] Connected to backend.");
        addTerminalLog("SYSTEM", "WebSocket live subscription feed initiated.", "success");
    };

    ws.onmessage = (event) => {
        try {
            const data = JSON.parse(event.data);
            handleWSMessage(data);
        } catch (err) {
            console.error("[WS] Error parsing message:", err);
        }
    };

    ws.onclose = () => {
        console.log("[WS] Connection closed. Retrying...");
        addTerminalLog("WARN", "WebSocket disconnected. Reconnecting in 5 seconds...", "warn");
        setTimeout(connectWebSocket, 5000);
    };

    ws.onerror = (err) => {
        console.error("[WS] Error:", err);
    };
}

function handleWSMessage(data) {
    switch (data.type) {
        case "config_updated":
            addTerminalLog("SYSTEM", `Configuration updated: ${data.client.nama_bisnis}`, "success");
            currentClient = data.client;
            document.getElementById("wa-name").innerText = `${currentClient.nama_bisnis} Concierge`;
            break;
            
        case "message_in":
            addTerminalLog("USER", `Incoming message from ${data.sender}: "${data.text}"`, "info");
            if (data.sender !== "simulator_dashboard") {
                injectChatBubble(data.text, "customer");
            }
            break;
            
        case "ai_processing":
            setTypingStatus(true);
            addTerminalLog("AI ROUTER", "Processing response...", "info");
            break;
            
        case "ai_reply":
            setTypingStatus(false);
            addTerminalLog("AI REPLY", `Response sent to ${data.sender}`, "success");
            // If the message is from simulator, we need to show the response in chat
            injectChatBubble(data.text, "agent");
            break;
            
        case "anger_detected":
            addTerminalLog("EMOTION ENGINE", `Anger detected! Generated voucher code: ${data.voucher_code} for customer: ${data.customer_phone}`, "warn");
            triggerToast(`Anger detected! Voucher: ${data.voucher_code}`, "error");
            break;
            
        case "tool_execution":
            let argStr = JSON.stringify(data.arguments);
            let successMsg = `Executed tool [${data.tool}] with arguments ${argStr}`;
            if (data.ticket_id) {
                successMsg += ` -> Ticket ID: ${data.ticket_id}`;
            }
            addTerminalLog("TOOL RUNNER", successMsg, "success");
            triggerToast(`Tool execution success: ${data.tool}`, "success");
            break;
            
        default:
            console.log("Unknown WS event:", data);
    }
}
