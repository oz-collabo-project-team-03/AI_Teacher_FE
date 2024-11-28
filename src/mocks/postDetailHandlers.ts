import { http, HttpResponse } from 'msw';
import { PostListResponse } from '@/types/postType';
import teacherDefaultIcon from '@/assets/editProfile/teacher/teacherDefaultIcon.png';
import studentDefaultIcon from '@/assets/editProfile/student/studentDefaultIcon.png';
import img1 from '@/assets/slider/daily1.webp';
import img2 from '@/assets/slider/daily2.webp';
import img3 from '@/assets/slider/daily3.webp';

const MOCK_POSTS_1: PostListResponse = {
  next: '/posts/me?page=2',
  previous: null,
  posts: [
    {
      post_id: 'POST001',
      id: 'dlguswn',
      nickname: '현주핑',
      profile_image: studentDefaultIcon,
      career_aspiration: '프로게이머',
      interest: '게임',
      like_count: 12,
      comment_count: 5,
      image1: img1,
      image2: img2,
      image3: img3,
      content: '안녕하세요??',
      created_at: '2024-03-19T12:30:45.000Z',
    },
    {
      post_id: 'POST002',
      id: 'dlguswn',
      nickname: '현주핑',
      profile_image: studentDefaultIcon,
      career_aspiration: '프로게이머',
      interest: '게임',
      like_count: 18,
      comment_count: 6,
      image1: img1,
      image2: img2,
      image3: img3,
      content: '안녕하세요??',
      teacher: {
        nickname: '김현준',
        profile_image: teacherDefaultIcon,
      },
      created_at: '2024-03-20T12:30:45.000Z',
    },
    {
      post_id: 'POST003',
      id: 'dlguswn',
      nickname: '현주핑',
      profile_image: studentDefaultIcon,
      career_aspiration: '프로게이머',
      interest: '게임',
      like_count: 1,
      comment_count: 5,
      image1: img1,
      image2: img2,
      image3: img3,
      content: '안녕하세요??',
      teacher: {
        nickname: '김현준',
        profile_image: teacherDefaultIcon,
      },
      created_at: '2024-03-21T12:30:45.000Z',
    },
    {
      post_id: 'POST004',
      id: 'dlguswn',
      nickname: '현주핑',
      profile_image: studentDefaultIcon,
      career_aspiration: '프로게이머',
      interest: '게임',
      like_count: 20,
      comment_count: 7,
      image1: img1,
      image2: img2,
      image3: img3,
      content: '안녕하세요??',
      teacher: {
        nickname: '김현준',
        profile_image: teacherDefaultIcon,
      },
      created_at: '2024-03-22T12:30:45.000Z',
    },
    {
      post_id: 'POST005',
      id: 'dlguswn',
      nickname: '현주핑',
      profile_image: studentDefaultIcon,
      career_aspiration: '프로게이머',
      interest: '게임',
      like_count: 23,
      comment_count: 5,
      image1: img1,
      image2: img2,
      image3: img3,
      content: '안녕하세요??',
      created_at: '2024-03-19T12:30:45.000Z',
    },
  ],
};

export const postDetailHandlers = [
  // 내 게시글 목록 조회
  http.get('/posts/me', async ({ request }) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page')) || 1;
    const myPosts = MOCK_POSTS_1;

    return HttpResponse.json({
      next: page < 3 ? `/posts/me?page=${page + 1}` : null,
      previous: page > 1 ? `/posts/me?page=${page - 1}` : null,
      posts: myPosts.posts,
    });
  }),

  // 특정 사용자의 게시글 목록 조회
  http.get('/posts/users/:userId', async ({ request }) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page')) || 1;
    const userPosts = MOCK_POSTS_1;

    if (!userPosts) {
      return HttpResponse.json(
        {
          success: false,
          message: '사용자를 찾을 수 없습니다.',
          error: 'USER_NOT_FOUND',
        },
        { status: 404 }
      );
    }

    return HttpResponse.json({
      next: page < 3 ? `/posts/users/:userId?page=${page + 1}` : null,
      previous: page > 1 ? `/posts/users/:userId?page=${page - 1}` : null,
      posts: userPosts.posts,
    });
  }),
];
