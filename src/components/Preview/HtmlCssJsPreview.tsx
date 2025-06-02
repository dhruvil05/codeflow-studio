import React from "react";

type HtmlCssJsPreviewProps = {
  html: string;
  css: string;
  js?: string;
};

const HtmlCssJsPreview: React.FC<HtmlCssJsPreviewProps> = ({ html, css, js = "" }) => {
  const fullContent = `
    <html>
      <head>
        <style>${css}</style>
      </head>
      <body>
        ${html}
        <script>${js}</script>
      </body>
    </html>
  `;

  return (
    <iframe
      className="w-full h-96 border rounded"
      srcDoc={fullContent}
      sandbox="allow-scripts allow-same-origin"
    />
  );
};

export default HtmlCssJsPreview;
