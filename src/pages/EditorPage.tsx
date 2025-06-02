import { useState } from "react";
import CodeEditor from "../components/Editor/CodeEditor";
import HtmlCssJsPreview from "../components/Preview/HtmlCssJsPreview";

const EditorPage = () => {
    const [html, setHtml] = useState("<h1>Hello World</h1>");
    const [css, setCss] = useState("h1 { color: black; }");
    const [js, setJs] = useState("");

    return (
        <div className="p-4 space-y-6">
            <h2 className="text-2xl font-bold">Live Editor</h2>
            <div className="grid grid-cols-3 gap-4">
                <div>
                    <h3 className="font-semibold mb-1">HTML</h3>
                    <CodeEditor language="html" value={html} onChange={(val) => setHtml(val || "")} />
                </div>
                <div>
                    <h3 className="font-semibold mb-1">CSS</h3>
                    <CodeEditor language="css" value={css} onChange={(val) => setCss(val || "")} />
                </div>
                <div>
                    <h3 className="font-semibold mb-1">JavaScript</h3>
                    <CodeEditor language="javascript" value={js} onChange={(val) => setJs(val || "")} />
                </div>
            </div>
            <div>
                <h3 className="text-xl font-semibold mb-2">Live Preview</h3>
                <HtmlCssJsPreview html={html} css={css} js={js} />
            </div>
        </div>
    );
};

export default EditorPage;
