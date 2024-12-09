export const getMessageMetadata = (
    userType: string,
    page: {
      student_nickname?: string;
      teacher_nickname?: string;
      student_profile?: string;
      teacher_profile?: string;
      ai_profile?: string;
    }
  ) => {
    if (userType === 'teacher') {
      return {
        nickname: `${page.teacher_nickname || '이름없음'} 선생님`,
        profileImage: page.teacher_profile || '@/assets/editProfile/teacher/teacherIcon1.png',
      };
    }
  
    if (userType === 'student') {
      return {
        nickname: `${page.student_nickname || '이름없음'} 학생`,
        profileImage: page.student_profile || '@/assets/editProfile/student/studentIcon1.png',
      };
    }
  
    if (userType === 'ai') {
      return {
        nickname: 'AI',
        profileImage: page.ai_profile || '@/assets/editProfile/teacher/teacherIcon1.png',
      };
    }
  
    return { nickname: 'system', profileImage: '' };
  };
  