import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const RichTextEditor = ({ data, setData }) => {
  return (
    <>
      <ReactQuill theme="snow" value={data} onChange={setData} />

      <div dangerouslySetInnerHTML={{ __html: data }}></div>
    </>
  );
};

export default RichTextEditor;
