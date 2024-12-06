// 댓글 데이터 타입 정의
export type StudentsListResponseDto = {
  teacher: {
    teacher_id: number;
    teacher_image_url: string;
    teacher_nickname: string;
  };
  students: Array<{
    room_id: number | null;
    student_id: number;
    student_nickname: string;
    student_image_url: string;
    help_checked: boolean;
  }>;
};
