import os
import re

file_path = os.path.join(os.path.dirname(__file__), "frontend", "src", "App.js")

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# 1. Change initial state of view to 'landing'
content = content.replace(
    "const [currentView, setCurrentView] = useState('admin');",
    "const [currentView, setCurrentView] = useState('landing');"
)

# 2. Modify simulation control bar render condition
old_control_bar_start = """                    {/* --- SIMULATION CONTROL BAR --- */}
                    <div class="sticky top-0 z-50 glassmorphism border-b border-slate-800/80 px-6 py-3 flex flex-wrap items-center justify-between gap-4 shadow-xl">"""

new_control_bar_start = """                    {/* --- SIMULATION CONTROL BAR --- */}
                    {currentView !== 'landing' && (
                    <div class="sticky top-0 z-50 glassmorphism border-b border-[#21232d]/80 px-6 py-3 flex flex-wrap items-center justify-between gap-4 shadow-xl">"""

content = content.replace(old_control_bar_start, new_control_bar_start)

# Add matching closing brace for the conditional check
old_control_bar_end = """                        ) : (
                            <div class="text-xs text-slate-400 font-mono bg-slate-900 border border-slate-800/50 rounded-xl px-4 py-2 flex items-center gap-2">
                                <Icon name="check" className="text-emerald-500 w-4 h-4" />
                                Data isolated centrally on shared schema (LocalDB)
                            </div>
                        )}
                    </div>"""

new_control_bar_end = """                        ) : (
                            <div class="text-xs text-slate-400 font-mono bg-slate-900 border border-slate-800/50 rounded-xl px-4 py-2 flex items-center gap-2">
                                <Icon name="check" className="text-emerald-500 w-4 h-4" />
                                Data isolated centrally on shared schema (LocalDB)
                            </div>
                        )}
                    </div>
                    )}"""

content = content.replace(old_control_bar_end, new_control_bar_end)

# 3. Add back-to-landing button in Control Bar Navigation
old_nav_buttons = """                        <div class="flex bg-slate-900/80 p-1 rounded-xl border border-slate-800/60 font-medium text-xs">
                            <button 
                                onClick={() => setCurrentView('admin')}"""

new_nav_buttons = """                        <div class="flex bg-slate-900/80 p-1 rounded-xl border border-slate-800/60 font-medium text-xs">
                            <button 
                                onClick={() => setCurrentView('landing')} 
                                class="px-3 py-2 rounded-lg flex items-center gap-1.5 text-slate-400 hover:text-slate-200"
                            >
                                Welcome Home
                            </button>
                            <button 
                                onClick={() => setCurrentView('admin')}"""

content = content.replace(old_nav_buttons, new_nav_buttons)

# 4. Inject WelcomeLanding router in main content router
old_main_router = """                    <main class="flex-grow">
                        {currentView === 'admin' && ("""

new_main_router = """                    <main class="flex-grow">
                        {currentView === 'landing' && (
                            <WelcomeLanding onLaunchConsole={() => setCurrentView('admin')} />
                        )}

                        {currentView === 'admin' && ("""

content = content.replace(old_main_router, new_main_router)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Updated App.js routing and landing page successfully!")
