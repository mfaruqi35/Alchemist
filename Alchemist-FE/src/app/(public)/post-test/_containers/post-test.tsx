import PostTestSection from '@/components/page/public/post-test/post-test-section';
import NavLayout from '@/core/layouts/nav.layout';

export default function ContainerPostTest() {
  return (
    <NavLayout>
      <main className="w-full min-h-screen bg-background">
        <PostTestSection />
      </main>
    </NavLayout>
  );
}
