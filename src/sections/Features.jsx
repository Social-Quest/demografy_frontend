import features1 from '../assets/features1.jpg'
import features2 from '../assets/features2.jpg'
import features3 from '../assets/features3.jpg'
import featureIcon1 from '../assets/featuresIcon1.svg'
import featureIcon2 from '../assets/featuresIcon2.svg'
import GradientButton from '../components/GradientButton.jsx'
import arrowDown from '../assets/arrowDown.svg'
import { FadeInUp, FadeIn, SlideInLeft, SlideInRight } from '../utils/animations.jsx'

const featuresData = [
  {
    subtitle: 'Features',
    highlight: 'Everything',
    title: 'you need to make a smart move.',
    description:
      'Track property prices, sales trends, and growth patterns across every Australian suburb. Our data updates daily from Domain, realestate.com.au, and official sources.',
    highlightCards: [
      {
        title: 'Capital Growth Tracker',
        description:
          'See which suburbs are booming and which are cooling. Track prices over 5+ years with projections.',
        icon: featureIcon1,
      },
      {
        title: 'The Lifestyle Check',
        description:
          'Get the lowdown on cafes, schools, parks, and crime rates. Discover suburbs that fit every lifestyle.',
        icon: featureIcon2,
      },
    ],
    image: features1,
  },
  {
    subtitle: 'Features',
    highlight: 'Side-by-side',
    title: 'suburb comparison.',
    description:
      'Compare up to 5 suburbs at once. Stack them against price, growth rate, schools, crime, commute times, and 50+ other metrics.',
    highlightCards: [],
    cta: {
      label: 'Compare suburbs',
      href: '#pricing-cta',
    },
    image: features2,
  },
  {
    subtitle: 'Features',
    highlight: 'Track',
    title: 'livability scores, and much more.',
    description:
      'Beyond the price tag. We factor in schools, parks, cafes, transport, safety, and community vibe to show you what life is really like.',
    highlightCards: [
      {
        title: 'Custom Rankings',
        description:
          "Filter and rank suburbs by what matters to you—whether it's ROI potential, family-friendliness, or proximity to the beach.",
        icon: featureIcon1,
      },
      {
        title: 'Growth Predictions',
        description:
          'See which suburbs are about to boom. Our algorithms analyse trends, infra projects, and demographic shifts to spot opportunities early.',
        icon: featureIcon2,
      },
    ],
    image: features3,
  },
]

function Features() {
  const handleCtaClick = (href) => {
    if (!href) return
    if (href.startsWith('#')) {
      const target = document.getElementById(href.slice(1))
      if (target) {
        const baseOffset = window.innerWidth >= 1024 ? 200 : window.innerWidth >= 768 ? 160 : 140
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - baseOffset
        window.scrollTo({ top: Math.max(0, targetPosition), behavior: 'smooth' })
      }
      return
    }
    window.location.assign(href)
  }

  return (
    <section id="features" className="relative overflow-hidden py-16 md:py-24">
      <FadeInUp>
        <div className="mx-auto w-full max-w-[1200px] px-4 text-center md:px-6">
          <h2 className="text-3xl font-semibold text-slate-900 md:text-5xl">
            The smartest suburb
            <span className="block text-3xl font-semibold text-[#9CA3AF] md:text-5xl">
              search in Australia.
            </span>
          </h2>
          <FadeIn delay={0.2}>
            <p className="mx-auto mt-5 max-w-3xl text-base text-[#374151] md:text-base font-medium">
              We collect suburb-level insights from trusted sources — property listings, demographic data, and economic stats —
              and turn them into easy-to-read growth indicators. Whether you're buying, building, or advising clients, find the
              suburbs where the numbers really add up.
            </p>
          </FadeIn>
        </div>
      </FadeInUp>

      {featuresData.map((feature, index) => {
        const isReversed = index % 2 === 1
        // Zigzag pattern: Even (0,2) = text right/image left | Odd (1) = text left/image right
        const ImageAnimation = isReversed ? SlideInRight : SlideInLeft
        const ContentAnimation = isReversed ? SlideInLeft : SlideInRight

        return (
          <div
            key={feature.title}
            className="mx-auto mt-12 flex w-full flex-col gap-12 px-4 md:px-6 lg:grid lg:grid-cols-2 lg:items-center lg:gap-20"
          >
            {/* Text Content */}
            <div
              className={`order-2 ${
                isReversed ? 'lg:order-1 lg:col-start-1' : 'lg:order-2 lg:col-start-2'
              }`}
            >
              <ContentAnimation delay={0.1 + index * 0.2}>
                <div className={`${feature.cta ? 'p-5 lg:p-6' : ''}`}>
                <FadeIn delay={0.1}>
                  <span className="inline-flex items-center gap-2 rounded-sm bg-[#ede9fe] px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#8b5cf6]" />
                    {feature.subtitle}
                  </span>
                </FadeIn>

                <FadeInUp delay={0.2}>
                  <h2 className="mt-5 text-3xl font-semibold leading-tight text-slate-900 md:text-5xl">
                    <span className="text-primary">{feature.highlight} </span>
                    {feature.title}
                  </h2>
                </FadeInUp>

                <FadeInUp delay={0.3}>
                  <p className="mt-6 max-w-xl text-base text-[#374151] md:text-lg">
                    {feature.description}
                  </p>
                </FadeInUp>

                {feature.highlightCards.length > 0 ? (
                  <div className="mt-10 grid gap-8 sm:grid-cols-2">
                    {feature.highlightCards.map((card, cardIndex) => (
                      <FadeInUp key={card.title} delay={0.4 + cardIndex * 0.1}>
                        <div className="flex flex-col gap-4 p-4">
                          <div
                            className={`flex h-12 w-12 items-center justify-center rounded-xl ${cardIndex % 2 === 0 ? 'bg-[#EDE9FE]' : 'bg-[#DBEAFE]'}`}
                          >
                            <img src={card.icon} alt="Feature icon" className="h-7 w-7" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-slate-900">{card.title}</h3>
                            <p className="mt-2 text-sm text-slate-600 md:text-base">{card.description}</p>
                          </div>
                          <button className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-[#374151] transition-colors cursor-pointer">
                            Learn more
                           <img src={arrowDown} alt="Arrow right" className="w-6 h-6" />
                          </button>
                        </div>
                      </FadeInUp>
                    ))}
                  </div>
                ) : feature.cta ? (
                  <FadeInUp delay={0.4}>
                    <GradientButton
                      className="mt-10"
                      onClick={() => handleCtaClick(feature.cta?.href)}
                    >
                      {feature.cta.label}
                    </GradientButton>
                  </FadeInUp>
                ) : null}
                </div>
              </ContentAnimation>
            </div>

            {/* Image */}
            <div
              className={`order-1 ${
                isReversed ? 'lg:order-2 lg:col-start-2' : 'lg:order-1 lg:col-start-1'
              }`}
            >
              <ImageAnimation delay={0.2 + index * 0.2}>
                <div className="overflow-hidden rounded-[34px] p-5">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full rounded-[26px] object-cover"
                  />
                </div>
              </ImageAnimation>
            </div>
          </div>
        )
      })}
    </section>
  )
}

export default Features
