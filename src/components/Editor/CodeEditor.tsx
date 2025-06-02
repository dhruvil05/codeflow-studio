import React from "react";
import Editor from "@monaco-editor/react";

type CodeEditorProps = {
    language: string;
    value: string;
    onChange: (value: string | undefined) => void;
};

const CodeEditor: React.FC<CodeEditorProps> = ({ language, value, onChange }) => {
    return (
        <Editor
            height="400px"
            defaultLanguage={language}
            defaultValue={value}
            theme="vs-dark"
            onChange={onChange}
        />
    );
};

export default CodeEditor;
