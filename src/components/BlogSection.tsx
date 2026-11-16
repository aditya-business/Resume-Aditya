import { ArrowUpRight, Clock } from 'lucide-react';
import { BLOG_POSTS, BlogPost } from '../data/portfolioData';

interface BlogSectionProps {
  onSelectPost: (post: BlogPost) => void;
}

function BlogThumbnail({ theme }: { theme: BlogPost['previewTheme'] }) {
  switch (theme) {
    case 'studio':
      return (
        <div className="w-full h-full bg-[#0D212E] p-6 flex flex-col justify-between text-white">
          <div className="flex items-center justify-between text-xs font-mono text-[#38BDF8]">
            <span>IIMB NOTES</span>
            <span>STRATEGY</span>
          </div>
          <div className="space-y-1">
            <div className="text-xl font-display font-bold">DIGITAL CHANNELS</div>
            <p className="text-xs text-sky-200/80">Funnel Economics &amp; CAC</p>
          </div>
          <div className="h-1.5 w-full bg-sky-950 rounded overflow-hidden">
            <div className="h-full bg-[#38BDF8] w-2/3" />
          </div>
        </div>
      );

    case 'code':
      return (
        <div className="w-full h-full bg-[#201529] p-6 flex flex-col justify-between text-white">
          <div className="flex items-center justify-between text-xs font-mono text-[#D8B4FE]">
            <span>BHU NOTES</span>
            <span>COGNITION</span>
          </div>
          <div className="space-y-1">
            <div className="text-xl font-display font-bold">DECISION HEURISTICS</div>
            <p className="text-xs text-purple-200/80">Psychology in User Action</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#C084FC]" />
            <span className="w-2 h-2 rounded-full bg-[#A855F7]" />
            <span className="w-2 h-2 rounded-full bg-[#7E22CE]" />
          </div>
        </div>
      );

    case 'design':
      return (
        <div className="w-full h-full bg-[#18231C] p-6 flex flex-col justify-between text-white">
          <div className="flex items-center justify-between text-xs font-mono text-[#4ADE80]">
            <span>ENTRANCE UG</span>
            <span>ANALYTICS</span>
          </div>
          <div className="space-y-1">
            <div className="text-xl font-display font-bold">ORGANIC GROWTH</div>
            <p className="text-xs text-emerald-200/80">Search Console to Registrations</p>
          </div>
          <div className="text-xs font-mono text-emerald-300">+32% CTR</div>
        </div>
      );
  }
}

export function BlogSection({ onSelectPost }: BlogSectionProps) {
  return (
    <section
      id="blog"
      className="scroll-mt-24 max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-10 py-20 lg:py-24"
    >
      <div className="text-center mb-12 lg:mb-14">
        <p className="text-[13px] font-medium uppercase tracking-[0.18em] text-[#FF014F] mb-3">
          NOTES &amp; REFLECTIONS
        </p>
        <h2 className="font-display font-bold text-4xl sm:text-[48px] text-[#D9D9D9] tracking-tight">
          Student Notes
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {BLOG_POSTS.map((post) => (
          <article
            key={post.id}
            className="group p-7 rounded-2xl neu-card flex flex-col justify-between"
          >
            <div>
              <button
                type="button"
                onClick={() => onSelectPost(post)}
                aria-label={`Read article: ${post.title}`}
                className="w-full aspect-[4/3] rounded-xl overflow-hidden block cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF014F] transition-transform duration-300 group-hover:scale-[1.02]"
              >
                <BlogThumbnail theme={post.previewTheme} />
              </button>

              <div className="mt-5 flex items-center justify-between gap-3">
                <span className="text-[12px] font-medium uppercase tracking-[0.12em] text-[#FF014F]">
                  {post.category}
                </span>
                <span className="inline-flex items-center gap-1.5 text-[12px] text-[#9BA3B0]">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{post.readTime}</span>
                </span>
              </div>

              <h3 className="mt-3">
                <button
                  type="button"
                  onClick={() => onSelectPost(post)}
                  className="text-left font-display font-semibold text-[20px] leading-[1.45] text-[#D9D9D9] hover:text-[#FF014F] transition-colors inline-flex items-start gap-1.5 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF014F] rounded"
                >
                  <span>{post.title}</span>
                  <ArrowUpRight className="w-4 h-4 shrink-0 mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#FF014F]" />
                </button>
              </h3>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
