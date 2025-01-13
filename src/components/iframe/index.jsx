import { useRef, useEffect } from "react";

export const ExternalIframe = ({ html }) => {
  const iframeRef = useRef();

  useEffect(() => {
    if (iframeRef.current) {
      const iframeDoc = iframeRef.current.contentDocument;
      iframeDoc.open();
      iframeDoc.write(html);
      iframeDoc.close();
    }
  }, [html]);

  return (
    <iframe
      style={{
        width: "100%",
        height: "90%",
        border: "1px solid #e4e4e7",
        borderRadius: "5px",
        marginTop: "20px",
      }}
      ref={iframeRef}
    />
  );
};
