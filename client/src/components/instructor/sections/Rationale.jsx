import EditableText from "../EditableText";
import ReviewList from "../ReviewList";

export default function Rationale({ data, isEditing, onChange }) {
  return (
    <>
      <h3 className="text-xl font-bold pt-10">II. RATIONALE</h3>

      <div className={isEditing ? "bg-blue-50 p-4" : "mt-3"}>
        <EditableText
          value={data.content}
          multiline
          isEditing={isEditing}
          onChange={(v) => onChange("reviews_per_docs.rationale.rationale_content", v)}
        />
      </div>
    </>
  );
}
