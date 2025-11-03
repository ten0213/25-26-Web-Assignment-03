import type{ Student } from "./types";

type Props = {
  students: Student[];
  onDelete: (id: string) => void;
};

export default function StudentList({ students, onDelete }: Props) {
  if (students.length === 0) {
    return <p className="empty">등록된 학생이 없습니다.</p>;
  }

  return (
    <ul className="list">
      {students.map((s) => (
        <li key={s.id} className="card">
          <div className="card-main">
            <h3>{s.name}</h3>
            <p>
              <span className="pill">학번</span> {s.studentId}
            </p>
            <p>
              <span className="pill">학과</span> {s.department || "-"}
            </p>
            <p>
              <span className="pill">성별</span> {s.gender || "-"}
            </p>
          </div>
          <button className="danger" onClick={() => onDelete(s.id)}>
            삭제
          </button>
        </li>
      ))}
    </ul>
  );
}
