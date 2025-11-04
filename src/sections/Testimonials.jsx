import customer1 from '../assets/customer1.png'
import customer2 from '../assets/customer2.png'
import useCaseImg from '../assets/useCase.jpg'
import GradientButton from '../components/GradientButton.jsx'
import company1 from '../assets/company1.svg'
import company2 from '../assets/company2.svg'
import { FadeIn, FadeInUp, ScaleIn, SlideInLeft, SlideInRight } from '../utils/animations.jsx'

const testimonials = [
    {
        quote:
            'Demografy is now non-negotiable in our client process. The granular growth data and demographic insights allow us to build irrefutable cases for our recommendations, justifying our strategies and winning our clients the best deals.',
        name: 'Alex Rodriguez',
        role: 'Buyer’s Agent',
        icon: company1,
        company: 'INTERCOM',
        customerImg: customer1,
    },
    {
        quote:
            'As a homeowner, I used the platform to find my perfect suburb. Later, I used the exact same tools to identify a high-growth unit for my first investment. It made the leap from emotional home-buying to strategic investing feel like the most natural, data-backed step.',
        name: 'Sarah Thompson',
        role: 'Home-owner & investor',
        icon: company2,
        company: 'Abstract',
        customerImg: customer2,
    },
]

function Testimonials() {
    return (
        <section className="bg-[#F3F4F6] py-20 md:py-24" id="use-case">
            <div className="mx-auto w-full max-w-[1200px] px-4 md:px-6">


                <div className=" text-center">
                    <FadeIn delay={0.1}>
                        <span className="inline-flex items-center gap-2 rounded-sm bg-[#ede9fe] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#7C3AED]">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#8b5cf6]" /> Customer voices
                        </span>
                    </FadeIn>
                    <FadeInUp delay={0.2}>
                        <h2 className="mt-4 text-3xl font-semibold text-slate-900 md:text-5xl">Early adopters are saying.</h2>
                    </FadeInUp>
                </div>

                <div className="mt-12 grid gap-8 md:mt-16 md:grid-cols-2">
                    {testimonials.map((testimonial, index) => (
                        <ScaleIn key={testimonial.name} delay={0.3 + index * 0.15}>
                            <article
                                className="flex h-full flex-col gap-6 rounded-[28px] "
                            >
                            <div className="flex items-center gap-4">
                                <img
                                    src={testimonial.customerImg}
                                    alt={testimonial.name}
                                    className="h-14 w-14 rounded-full object-cover"
                                />
                            </div>

                            <p className="text-lg text-[#1f2937] md:text-xl">“{testimonial.quote}”</p>
                            <div className="flex items-center gap-2">
                                <img src={testimonial.icon} alt={testimonial.company} className="h-8 w-8 object-cover" />
                                <span className="block text-2xl font-medium text-[#9ca3af]" > {testimonial.company}</span>
                            </div>
                            <div className="mt-auto text-base font-medium text-black">
                                {testimonial.name}
                                <span className="block text-base font-medium text-[#9ca3af]" >{testimonial.role}</span>
                            </div>
                        </article>
                        </ScaleIn>
                    ))}
                </div>
                <div className="grid w-full gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-center mt-20">
                    <SlideInLeft delay={0.5}>
                        <div className="space-y-6">
                            <FadeInUp delay={0.6}>
                                <h2 className="text-4xl font-semibold leading-tight text-slate-900 md:text-5xl">
                                    Powered by <span className="text-primary">Australia's</span> most trusted sources.
                                </h2>
                            </FadeInUp>
                            <FadeInUp delay={0.7}>
                                <p className="text-base text-[#374151] md:text-lg">
                                    We pull data from the Australian Bureau of Statistics, Domain, realestate.com.au, and local government databases.
                                    Updated daily. Verified rigorously. No guesswork, no outdated listings, no marketing spin.
                                </p>
                            </FadeInUp>
                            <FadeInUp delay={0.8}>
                                <GradientButton className="mt-6 w-fit">Get early access</GradientButton>
                            </FadeInUp>
                        </div>
                    </SlideInLeft>

                    <SlideInRight delay={0.5}>
                        <div className="overflow-hidden rounded-[32px]"><img src={useCaseImg} alt="Trusted sources dashboard preview" className="w-full rounded-[24px] object-cover" /></div>
                    </SlideInRight>
                </div>
            </div>
        </section>
    )
}

export default Testimonials
