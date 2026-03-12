import FireParticles from '@/components/FireParticles';
import AppHeader from '@/components/AppHeader';
import PostInput from '@/components/PostInput';
import Feed from '@/components/Feed';
import PromotionSection from '@/components/PromotionSection';
import AppFooter from '@/components/AppFooter';

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative">
      <FireParticles />
      <AppHeader />
      <PostInput />
      <Feed />
      <PromotionSection />
      <AppFooter />
    </div>
  );
};

export default Index;
