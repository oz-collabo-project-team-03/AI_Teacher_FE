import { http, HttpResponse } from 'msw';
import { PostListResponse } from '@/types/postType';
import teacherDefaultIcon from '@/assets/editProfile/teacher/teacherDefaultIcon.png';
import student10 from '@/assets/editProfile/student/studentIcon10.png';
import img1 from '@/assets/slider/daily1.webp';
import img2 from '@/assets/slider/daily2.webp';
import img3 from '@/assets/slider/daily3.webp';

const MOCK_POSTS_1: PostListResponse = {
  next: '/posts?page=2',
  previous: null,
  posts: [
    {
      post_id: 'POST001',
      id: 'esd',
      nickname: '현주핑',
      profile_image: student10,
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
      id: 'qwesd',
      nickname: '경원핑',
      profile_image: student10,
      career_aspiration: '로또 당첨',
      interest: '알바',
      like_count: 10,
      comment_count: 18,
      image1: img1,
      image2: img2,
      image3: img3,
      content: '안녕하세요??',
      teacher: {
        nickname: '김보라',
        profile_image: teacherDefaultIcon,
      },
      created_at: '2024-03-19T12:30:45.000Z',
    },
    {
      post_id: 'POST003',
      id: 'qwQsesd',
      nickname: '도인핑',
      profile_image: student10,
      career_aspiration: '펜트하우스 소유',
      interest: '홈 카페',
      like_count: 12,
      comment_count: 13,
      image1: img1,
      image2: img2,
      image3: img3,
      content: '안녕하세요??',
      teacher: {
        nickname: '이시혁',
        profile_image: teacherDefaultIcon,
      },
      created_at: '2024-03-19T12:30:45.000Z',
    },
    {
      post_id: 'POST004',
      id: 'qwe23sd',
      nickname: '승혜핑',
      profile_image: student10,
      career_aspiration: '지구 한바퀴 돌기',
      interest: '여행',
      like_count: 20,
      comment_count: 23,
      image1: img1,
      image2: img2,
      image3: img3,
      content: '안녕하세요??',
      created_at: '2024-03-19T12:30:45.000Z',
    },
    {
      post_id: 'POST005',
      id: '4qwqw1d',
      nickname: '승진핑',
      profile_image: student10,
      career_aspiration: '포켓몬 트레이너',
      interest: '알통몬',
      like_count: 3,
      comment_count: 5,
      image1: img1,
      image2: img2,
      image3: img3,
      content: '안녕하세요??',
      created_at: '2024-03-19T12:30:45.000Z',
    },
  ],
};

export const homeFeedHandlers = [
  // 전체 게시글 목록 조회
  http.get('/posts', async ({ request }) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page')) || 1;
    const myPosts = MOCK_POSTS_1;

    return HttpResponse.json({
      next: page < 3 ? `/posts?page=${page + 1}` : null,
      previous: page > 1 ? `/posts?page=${page - 1}` : null,
      posts: myPosts.posts,
    });
  }),
];
