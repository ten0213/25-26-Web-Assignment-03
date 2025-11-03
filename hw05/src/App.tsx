import { useEffect, useState } from "react";
import "./App.css";
import StudentForm from "./StudentForm";
import StudentList from "./StudentList";
import type{ Student } from "./types";

const STORAGE_KEY = "students";

export default function App() {
  const [students, setStudents] = useState<Student[]>([]);

  // 1) 시작할 때 저장된 데이터 불러오기
  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    try {
      const parsed: Student[] = JSON.parse(raw);
      setStudents(parsed);
    } catch {
      // 깨진 데이터면 무시
    }
  }, []);

  // 2) students 바뀔 때마다 저장
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
  }, [students]);

  // 학생 추가 (id는 여기서 생성)
  const handleAdd = (s: Omit<Student, "id">) => {
    setStudents((prev) => [{ id: crypto.randomUUID(), ...s }, ...prev]);
  };

  // 삭제
  const handleDelete = (id: string) => {
    setStudents((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <div className="container">
      <h1>학생 정보 관리</h1>
      <StudentForm onAdd={handleAdd} />
      <StudentList students={students} onDelete={handleDelete} />
    </div>
  );
}
