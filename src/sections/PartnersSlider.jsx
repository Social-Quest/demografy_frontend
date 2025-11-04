import partners1 from '../assets/partners1.png'
import partners2 from '../assets/partners2.png'
import partners3 from '../assets/partners3.png'
import partners4 from '../assets/partners4.png'
import partners5 from '../assets/partners5.png'

function PartnersSlider({ className = '', headingClassName = '' }) {
  const partners = [partners1, partners2, partners3, partners4, partners5]

  return (
    <div className={`w-full overflow-hidden py-12 md:py-16 ${className}`}>
      <div className="mx-auto w-full max-w-[1200px] px-4 md:px-6">
        <h2 className={`mb-8 text-center text-lg font-medium text-slate-700 md:text-xl ${headingClassName}`}>
          Our data partners
        </h2>

        <div className="relative w-full overflow-hidden group">
          <div className="flex w-max animate-scroll gap-12 md:gap-16">
            {[...partners, ...partners].map((partner, index) => (
              <div key={index} className="flex-shrink-0">
                <img
                  src={partner}
                  alt={`Partner ${index + 1}`}
                  className="h-8 w-auto opacity-60 grayscale transition hover:grayscale-0 md:h-10"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PartnersSlider
