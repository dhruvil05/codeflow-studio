import { useEffect, useState } from "react";
import CodeEditor from "../components/Editor/CodeEditor";
import HtmlCssJsPreview from "../components/Preview/HtmlCssJsPreview";
import api from "../services/api";
import TemplateSelector from "../components/UI/TemplateSelector";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditorPage = () => {
    const [html, setHtml] = useState("<h1>Hello World</h1>");
    const [css, setCss] = useState("h1 { color: black; }");
    const [js, setJs] = useState("");
    const [title, setTitle] = useState("");
    const [templateId, setTemplateId] = useState<number | null>(null);

    const [storedTemplates, setStoredTemplates] = useState<any[]>([]);

    // Fetch templates on mount
    useEffect(() => {
        const fetchTemplates = async () => {
            try {
                const res = await api.get('/templates');
                setStoredTemplates(res.data); // store full objects
            } catch (err) {
                console.error("Failed to fetch templates", err);
            }
        };
        fetchTemplates();
    }, []);

    const saveTemplate = async () => {
        try {
            await api.post('/templates', {
                html,
                css,
                js,
                title,
            });
            toast.success("Template saved!");
        } catch (err) {
            console.error(err);
            toast.error("Error saving template.");
        }
    };

    const updateTemplate = async () => {
        if (!templateId) {
            toast.warn("No template selected to update.");
            return;
        }
        try {
            await api.put(`/templates/${templateId}`, {
                html,
                css,
                js,
                title,
            });
            toast.success("Template updated successfully!");
        } catch (err) {
            console.error("Failed to update template", err);
            toast.error("Error updating template.");
        }
    };

    const loadTemplate = async (selectedTitle: string) => {
        if (!selectedTitle) return;
        const tpl = storedTemplates.find((t: any) => t.title === selectedTitle);
        if (!tpl || !tpl.id) {
            toast.error("Template not found or missing ID.");
            return;
        }
        try {
            const res = await api.get(`/templates/${tpl.id}`);
            const { html, css, js, title, id } = res.data;
            setHtml(html || "");
            setCss(css || "");
            setJs(js || "");
            setTitle(title || "");
            setTemplateId(id || null);
            toast.info("Template loaded.");
        } catch (err) {
            console.error("Failed to load template", err);
            toast.error("Error loading template.");
        }
    };

    // Reset templateId when title is changed manually (for new templates)
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
        const tpl = storedTemplates.find((t: any) => t.title === e.target.value);
        setTemplateId(tpl ? tpl.id : null);
    };

    return (
        <div className="p-4 max-w-7xl mx-auto space-y-8">
            <ToastContainer />
            {/* Template Title and Save/Update Button Section */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <input
                    type="text"
                    placeholder="Template Title"
                    value={title}
                    onChange={handleTitleChange}
                    className="border border-gray-300 p-2 rounded w-full sm:w-2/3"
                />
                {templateId ? (
                    <button
                        onClick={updateTemplate}
                        className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded shadow"
                    >
                        Update Template
                    </button>
                ) : (
                    <button
                        onClick={saveTemplate}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded shadow"
                    >
                        Save Template
                    </button>
                )}
                <div className="flex items-center gap-2">
                    <TemplateSelector templates={storedTemplates.map(t => t.title)} onSelect={loadTemplate} />
                </div>
            </div>

            {/* Editor Section */}
            <div>
                <h2 className="text-2xl font-bold mb-4">Live Editor</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <h3 className="font-semibold mb-2">HTML</h3>
                        <CodeEditor
                            key={`html-${title}`}
                            language="html"
                            value={html}
                            onChange={(val) => setHtml(val || '')}
                        />
                    </div>
                    <div>
                        <h3 className="font-semibold mb-2">CSS</h3>
                        <CodeEditor
                            key={`css-${title}`}
                            language="css"
                            value={css}
                            onChange={(val) => setCss(val || '')}
                        />
                    </div>
                    <div>
                        <h3 className="font-semibold mb-2">JS</h3>
                        <CodeEditor
                            key={`js-${title}`}
                            language="javascript"
                            value={js}
                            onChange={(val) => setJs(val || '')}
                        />
                    </div>
                </div>
            </div>

            {/* Live Preview Section */}
            <div>
                <h3 className="text-xl font-semibold mb-2">Live Preview</h3>
                <div className="border rounded overflow-hidden shadow">
                    <HtmlCssJsPreview html={html} css={css} js={js} />
                </div>
            </div>
        </div>
    );
};

export default EditorPage;
