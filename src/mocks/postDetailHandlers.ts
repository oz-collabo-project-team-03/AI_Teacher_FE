import { http, HttpResponse } from 'msw';
import { PostDetailResponse } from '@/types/postDetail';
// import { useParams } from 'react-router-dom';

const MOCK_POSTS_1: PostDetailResponse = {
  next: '/api/posts?page=2',
  previous: null,
  posts: [
    {
      post_id: 'POST001',
      nickname: '학생태영',
      profile_image: 'https://s3.image.com',
      career_aspiration: '부자',
      interest: '돈',
      like_count: 10,
      comment_count: 18,
      image1: 's3.com',
      image2: 's3.com',
      image3: 's3.com',
      content: '안녕하세요??',
      teacher: {
        nickname: '도인핑',
        profile_image: 's3.com',
      },
      created_at: '2024-03-19T12:30:45.000Z',
    },
    {
      post_id: 'POST002',
      nickname: '학생태영',
      profile_image: 'https://s3.image.com',
      career_aspiration: '부자',
      interest: '돈',
      like_count: 10,
      comment_count: 18,
      image1: 's3.com',
      image2: 's3.com',
      image3: 's3.com',
      content: '안녕하세요??',
      teacher: {
        nickname: '도인핑',
        profile_image: 's3.com',
      },
      created_at: '2024-03-19T12:30:45.000Z',
    },
    {
      post_id: 'POST003',
      nickname: '학생태영',
      profile_image: 'https://s3.image.com',
      career_aspiration: '부자',
      interest: '돈',
      like_count: 10,
      comment_count: 18,
      image1: 's3.com',
      image2: 's3.com',
      image3: 's3.com',
      content: '안녕하세요??',
      teacher: {
        nickname: '도인핑',
        profile_image: 's3.com',
      },
      created_at: '2024-03-19T12:30:45.000Z',
    },
    {
      post_id: 'POST004',
      nickname: '학생태영',
      profile_image: 'https://s3.image.com',
      career_aspiration: '부자',
      interest: '돈',
      like_count: 10,
      comment_count: 18,
      image1: 's3.com',
      image2: 's3.com',
      image3: 's3.com',
      content: '안녕하세요??',
      teacher: {
        nickname: '도인핑',
        profile_image: 's3.com',
      },
      created_at: '2024-03-19T12:30:45.000Z',
    },
    {
      post_id: 'POST005',
      nickname: '학생태영',
      profile_image: 'https://s3.image.com',
      career_aspiration: '부자',
      interest: '돈',
      like_count: 10,
      comment_count: 18,
      image1: 's3.com',
      image2: 's3.com',
      image3: 's3.com',
      content: '안녕하세요??',
      teacher: {
        nickname: '도인핑',
        profile_image: 's3.com',
      },
      created_at: '2024-03-19T12:30:45.000Z',
    },
  ],
};

export const postDetailHandlers = [
  // 내 게시글 목록 조회
  http.get('/api/posts/me', async ({ request }) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page')) || 1;
    const myPosts = MOCK_POSTS_1;

    return HttpResponse.json(
      {
        success: true,
        message: '내 게시글 목록을 성공적으로 가져왔습니다.',
        data: {
          next: page < 3 ? `/api/posts?page=${page + 1}` : null,
          previous: page > 1 ? `/api/posts?page=${page - 1}` : null,
          posts: myPosts.posts,
        },
      },
      { status: 200 }
    );
  }),

  // 특정 사용자의 게시글 목록 조회
  http.get('/api/posts/:userId', async ({ request }) => {
    // const { userId } = useParams();
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

    return HttpResponse.json(
      {
        success: true,
        message: '사용자의 게시글 목록을 성공적으로 가져왔습니다.',
        data: {
          next: page < 3 ? `/api/posts?page=${page + 1}` : null,
          previous: page > 1 ? `/api/posts?page=${page - 1}` : null,
          posts: userPosts.posts,
        },
      },
      { status: 200 }
    );
  }),
];
