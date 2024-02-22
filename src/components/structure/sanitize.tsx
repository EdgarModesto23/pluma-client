import DOMPurify from "dompurify";

const SanitizedHTML = ({ htmlString }) => {
  const sanitizedHTML = DOMPurify.sanitize(htmlString);

  return <div dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />;
};

export default SanitizedHTML;
