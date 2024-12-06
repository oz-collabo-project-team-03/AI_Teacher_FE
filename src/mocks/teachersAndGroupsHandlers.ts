// import { Teacher } from '@/types/teacherType';
import { http, HttpResponse } from 'msw';

// const teachers: Teacher[] = [
const teachers = [
  {
    teacher_id: 1,
    name: '이현주',
    organization_name: '메이플스토리',
    organization_type: '고등학교',
    position: '코딩 선생님',
  },
  {
    teacher_id: 2,
    name: '변경원',
    organization_name: '로또분석',
    organization_type: '학원',
    position: '로또분석담당선생님',
  },
  {
    teacher_id: 3,
    name: '강승진',
    organization_name: '태초마을',
    organization_type: '학원',
    position: '포켓몬트레이너',
  },
  {
    teacher_id: 4,
    name: '노도인',
    organization_name: '노랑시티',
    organization_type: '학원',
    position: '노랑체육관 관장',
  },
  {
    teacher_id: 5,
    name: '강승혜',
    organization_name: '상록시티',
    organization_type: '학원',
    position: '상록체육관 관장',
  },
  {
    teacher_id: 6,
    name: '가현서',
    organization_name: '태초마을',
    organization_type: '학원',
    position: '럭키(간호포켓몬)',
  },
];

export const teachersAndGroupsHandler = [
  http.get('/auth/teachers', ({ request }) => {
    const url = new URL(request.url);
    const name = url.searchParams.get('name');

    if (name) {
      const filteredTeachers = teachers.filter((t) =>
        t.name.toLowerCase().includes(name.toLowerCase())
      );
      return HttpResponse.json(filteredTeachers);
    }

    return HttpResponse.json(teachers);
  }),

  http.get('/api/teachers/:name', ({ params }) => {
    const teacherName = params.name as string;
    const teacher = teachers.find(
      (t) => t.name.toLowerCase() === teacherName.toLowerCase()
    );

    if (teacher) {
      return HttpResponse.json(teacher);
    }

    return new HttpResponse(null, {
      status: 404,
      statusText: 'Teacher not found',
    });
  }),

  http.post('/auth/study/groups', async ({ request }) => {
    const body = await request.json();
    const { teacher_name } = body as { teacher_name: string };

    const selectedTeacher = teachers.find(
      (t) => t.name.toLowerCase() === teacher_name.toLowerCase()
    );

    if (selectedTeacher) {
      return HttpResponse.json(
        {
          success: true,
          message: `선생님 ${selectedTeacher.name}이(가) 선택되었습니다.`,
          selected_teacher: selectedTeacher,
        },
        { status: 200 }
      );
    } else {
      return HttpResponse.json(
        {
          success: false,
          message: '선택한 선생님을 찾을 수 없습니다.',
        },
        { status: 404 }
      );
    }
  }),
];
