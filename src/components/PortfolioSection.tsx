import { ArrowUpRight } from 'lucide-react';
import { PORTFOLIO_ITEMS, PortfolioItem } from '../data/portfolioData';

interface PortfolioSectionProps {
  onSelectProject: (project: PortfolioItem) => void;
}

export function PortfolioPreviewGraphic({
  variant,
  imagePath,
  imageBg,
  imageFit = 'contain',
  title,
}: {
  variant: PortfolioItem['previewVariant'];
  imagePath?: string;
  imageBg?: string;
  imageFit?: 'contain' | 'cover';
  title?: string;
}) {
  if (imagePath) {
    const isLightBg = imageBg?.toUpperCase() === '#FFFFFF';
    const isCover = imageFit === 'cover';
    return (
      <div
        style={{ backgroundColor: imageBg ?? '#062B34' }}
        className={`w-full h-full flex items-center justify-center ${
          isLightBg && !isCover ? 'border border-[#2E3239] p-1.5' : ''
        }`}
      >
        <img
          src={imagePath}
          alt={title ? `${title} preview` : 'Project preview'}
          referrerPolicy="no-referrer"
          className={`w-full h-full ${isCover ? 'object-cover object-center' : 'object-contain'}`}
        />
      </div>
    );
  }

  switch (variant) {
    case 'dashboard':
      return (
        <div className="w-full h-full bg-[#14171C] p-5 flex flex-col justify-between text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF014F]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#3A3F47]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#3A3F47]" />
            </div>
            <span className="text-[11px] font-mono text-[#8C929D]">IIMB · NEXUS</span>
          </div>
          <div className="space-y-2">
            <div className="h-2 rounded bg-[#2A2E35] w-3/4" />
            <div className="h-2 rounded bg-[#FF014F]/70 w-1/2" />
            <div className="h-2 rounded bg-[#2A2E35] w-5/6" />
          </div>
          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#2A2E35]">
            <div className="h-6 rounded bg-[#1F232B]" />
            <div className="h-6 rounded bg-[#1F232B]" />
            <div className="h-6 rounded bg-[#FF014F]/30" />
          </div>
        </div>
      );

    case 'mobile':
      return (
        <div className="w-full h-full bg-gradient-to-br from-[#1b1e23] to-[#111317] p-4 flex flex-col items-center justify-center text-white relative overflow-hidden">
          <div className="w-32 h-44 rounded-2xl border-2 border-[#2E3239] bg-[#16181D] p-2.5 flex flex-col justify-between shadow-lg">
            <div className="flex items-center justify-between text-[8px] text-[#8C929D]">
              <span>9:41</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF014F]" />
            </div>
            <div className="space-y-1.5 my-auto">
              <div className="h-2 rounded bg-[#FF014F] w-4/5" />
              <div className="h-1.5 rounded bg-[#2E3239] w-full" />
              <div className="h-1.5 rounded bg-[#2E3239] w-2/3" />
            </div>
            <div className="h-4 rounded bg-[#FF014F]/20 flex items-center justify-center">
              <span className="text-[8px] font-semibold text-[#FF014F]">OUTREACH</span>
            </div>
          </div>
        </div>
      );

    case 'brand':
      return (
        <div className="w-full h-full bg-[#0E1726] p-6 flex flex-col justify-between text-white relative">
          <div className="text-[10px] tracking-widest uppercase text-[#38BDF8]">
            MCKINSEY FORWARD
          </div>
          <div className="space-y-1">
            <div className="font-display font-bold text-2xl tracking-tight text-white">
              FORWARD
            </div>
            <p className="text-xs text-[#94A3B8]">Foundational Learning Program</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[10px] bg-[#38BDF8]/20 text-[#38BDF8] font-mono">
              COMPLETED
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] bg-white/10 text-slate-300 font-mono">
              2026
            </span>
          </div>
        </div>
      );

    case 'ecommerce':
      return (
        <div className="w-full h-full bg-gradient-to-br from-[#1a1c22] to-[#0f1115] p-5 flex flex-col justify-between text-white">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono text-[#FF014F]">ENTRANCE UG</span>
            <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-[#FF014F]/20 text-[#FF014F]">
              IPMAT 2027
            </span>
          </div>
          <div className="space-y-2">
            <div className="text-lg font-display font-bold text-white leading-tight">
              SPECIAL 50 BATCH
            </div>
            <p className="text-xs text-[#9BA3B0]">Curriculum Design · Launch Funnel</p>
          </div>
          <div className="grid grid-cols-2 gap-2 text-[11px]">
            <div className="p-2 rounded bg-[#212428] border border-[#2E3239]">
              <div className="text-[#9BA3B0] text-[9px] uppercase">Registrations</div>
              <div className="font-bold text-[#FF014F]">+140%</div>
            </div>
            <div className="p-2 rounded bg-[#212428] border border-[#2E3239]">
              <div className="text-[#9BA3B0] text-[9px] uppercase">Batch Fill</div>
              <div className="font-bold text-white">Target Met</div>
            </div>
          </div>
        </div>
      );

    case 'analytics':
      return (
        <div className="w-full h-full bg-[#12151B] p-5 flex flex-col justify-between text-white">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono text-[#10B981]">WEB ANALYTICS</span>
            <span className="text-[10px] font-mono text-[#8C929D]">SEO &amp; CTR</span>
          </div>
          <div className="flex items-end gap-2 h-20 pt-4">
            <div className="flex-1 bg-[#1F242F] rounded-t h-[40%]" />
            <div className="flex-1 bg-[#1F242F] rounded-t h-[60%]" />
            <div className="flex-1 bg-[#1F242F] rounded-t h-[55%]" />
            <div className="flex-1 bg-[#10B981]/50 rounded-t h-[75%]" />
            <div className="flex-1 bg-[#10B981] rounded-t h-[95%]" />
            <div className="flex-1 bg-[#FF014F] rounded-t h-[85%]" />
          </div>
          <div className="flex items-center justify-between text-xs text-[#9BA3B0] pt-2 border-t border-[#252A34]">
            <span>Google Search Console</span>
            <span className="text-emerald-400 font-semibold">+32% CTR</span>
          </div>
        </div>
      );

    case 'editorial':
      return (
        <div className="w-full h-full bg-gradient-to-br from-[#1e1b2e] to-[#12101f] p-5 flex flex-col justify-between text-white">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono text-[#C084FC]">UNHRC CONCLAVE</span>
            <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-[#A855F7]/20 text-[#C084FC]">
              DIPLOMACY
            </span>
          </div>
          <div className="space-y-1.5">
            <div className="text-lg font-display font-bold text-white leading-tight">
              VETO RESOLUTION
            </div>
            <p className="text-xs text-[#C4B5FD]/80">Policy Research &amp; Delegate Briefings</p>
          </div>
          <div className="text-xs text-[#A78BFA] flex items-center justify-between pt-2 border-t border-purple-900/40">
            <span>UNHRC Special Session</span>
            <span>2026</span>
          </div>
        </div>
      );
  }
}

export function PortfolioSection({ onSelectProject }: PortfolioSectionProps) {
  return (
    <section
      id="portfolio"
      className="scroll-mt-24 max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-10 py-20 lg:py-24"
    >
      <div className="text-center mb-12 lg:mb-14">
        <p className="text-[13px] font-medium uppercase tracking-[0.18em] text-[#FF014F] mb-3">
          INTERNSHIP PROJECTS · COMPETITIONS · ACTIVITIES
        </p>
        <h2 className="font-display font-bold text-4xl sm:text-[48px] text-[#D9D9D9] tracking-tight">
          Projects &amp; Initiatives
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {PORTFOLIO_ITEMS.map((project) => (
          <article
            key={project.id}
            className="group p-7 rounded-2xl neu-card flex flex-col justify-between transition-transform duration-300"
          >
            <div>
              <button
                type="button"
                onClick={() => onSelectProject(project)}
                className="w-full aspect-[4/3] rounded-xl overflow-hidden block cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF014F] transition-transform duration-300 group-hover:scale-[1.02]"
                aria-label={`View details for ${project.title}`}
              >
                <PortfolioPreviewGraphic
                  variant={project.previewVariant}
                  imagePath={project.imagePath}
                  imageBg={project.imageBg}
                  imageFit={project.imageFit}
                  title={project.title}
                />
              </button>

              <div className="mt-5 flex items-center justify-between gap-4">
                <span className="text-[12px] font-medium uppercase tracking-[0.12em] text-[#FF014F]">
                  {project.category}
                </span>
                <span className="text-[12px] text-[#9BA3B0]">
                  {project.date}
                </span>
              </div>

              <h3 className="mt-3">
                <button
                  type="button"
                  onClick={() => onSelectProject(project)}
                  className="text-left font-display font-semibold text-[20px] leading-[1.4] text-[#D9D9D9] hover:text-[#FF014F] transition-colors inline-flex items-start gap-1.5 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF014F] rounded"
                >
                  <span>{project.title}</span>
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
