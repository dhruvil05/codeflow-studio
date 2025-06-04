import { useState } from "react";
import CodeEditor from "../components/Editor/CodeEditor";
import HtmlCssJsPreview from "../components/Preview/HtmlCssJsPreview";
import api from "../services/api";

const EditorPage = () => {
    const [html, setHtml] = useState("<h1>Hello World</h1>");
    const [css, setCss] = useState("h1 { color: black; }");
    const [js, setJs] = useState("");
    const [title, setTitle] = useState("");

    const saveTemplate = async () => {
        try {
            await api.post('/templates', {
                html,
                css,
                js,
            });

        } catch (err) {
            console.error(err);
            alert("Error saving template.");
        }
    };

    return (
        <div className="p-4 max-w-7xl mx-auto space-y-8">
            {/* Template Title and Save Button Section */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <input
                    type="text"
                    placeholder="Template Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="border border-gray-300 p-2 rounded w-full sm:w-2/3"
                />
                <button
                    onClick={saveTemplate}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded shadow"
                >
                    Save Template
                </button>
            </div>

            {/* Editor Section */}
            <div>
                <h2 className="text-2xl font-bold mb-4">Live Editor</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <h3 className="font-semibold mb-2">HTML</h3>
                        <CodeEditor
                            language="html"
                            value={html}
                            onChange={(val) => setHtml(val || '')}
                        />
                    </div>
                    <div>
                        <h3 className="font-semibold mb-2">CSS</h3>
                        <CodeEditor
                            language="css"
                            value={css}
                            onChange={(val) => setCss(val || '')}
                        />
                    </div>
                    <div>
                        <h3 className="font-semibold mb-2">JavaScript</h3>
                        <CodeEditor
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
