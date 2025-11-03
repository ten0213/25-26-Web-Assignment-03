import { useState } from "react";
import type { Student } from "./types";

type Props = {
  onAdd: (student: Omit<Student, "id">) => void;
};

export default function StudentForm({ onAdd }: Props) {
  const [name, setName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [department, setDepartment] = useState("");
  const [gender, setGender] = useState<"남" | "여" | "기타" | "">("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !studentId.trim()) {
      alert("‼️이름과 학번은 필수 입력 사항입니다.");
      return;
    }
    onAdd({ name: name.trim(), studentId: studentId.trim(), department: department.trim(), gender });
    // 폼 리셋
    setName("");
    setStudentId("");
    setDepartment("");
    setGender("");
  };

  return (
    <form className="form" onSubmit={onSubmit}>
      <div className="row">
        <label>
          이름
          <input
            placeholder="예: 홍길동"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <label>
          학번
          <input
            placeholder="예: 20251004"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
          />
        </label>
      </div>

      <div className="row">
        <label>
          학과
          <input
            placeholder="예: it융합자율학부"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          />
        </label>

        <label>
          성별
          <select value={gender} onChange={(e) => setGender(e.target.value as any)}>
            <option value="">선택</option>
            <option value="남">남</option>
            <option value="여">여</option>
            <option value="기타">기타</option>
          </select>
        </label>
      </div>

      <button className="primary" type="submit">
        추가
      </button>
    </form>
  );
}
