import EditableText from "../EditableText";
import ReviewList from "../ReviewList";

export default function Significance({ data, isEditing, onChange }) {
  return (
    <>
        <h3 className="font-bold text-gray-900 pt-5 text-xl">III. SIGNIFICANCE</h3>
        <div className={isEditing ? "bg-blue-50 rounded-lg p-4 mt-3" : "mt-3"}>
          <EditableText
            value={data.content}
            onChange={(val) => onChange('reviews_per_docs.significance.significance_content', val)}
            multiline={true}
            className="text-base"
            isEditing={isEditing}
          />
        </div>
    </>
  );
}
