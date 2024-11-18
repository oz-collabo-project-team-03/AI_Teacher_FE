import Heart from '../../assets/feedPost/heart.svg';
import chat from '../../assets/feedPost/chat.svg';
import fullHeart from '../../assets/feedPost/fullHeart.svg';

const FeedPostContent = () => {
  return (
    <div className='h-[121px] [background-color:#E8BCB9]'>
      <div>
        <img src={Heart} alt='HeartIcon' className='h-[20px] w-[20px]' />
        <img
          src={fullHeart}
          alt='fullHeartIcon'
          className='h-[20px] w-[20px]'
        />
        <img src={chat} alt='fullHeartIcon' className='h-[17px] w-[17px]' />
      </div>
      <div>dddd</div>
    </div>
  );
};

//w-376, h-368
//w-375, h-212
//  h-156
//12.12.12 20
// 6,11,7 (좋아요와 협업 협업과 댓글 댓글과 날짜)
//6,9,18 ,6,9,7
//하단 사이즈 122

//40,7,8 = 55

export default FeedPostContent;
