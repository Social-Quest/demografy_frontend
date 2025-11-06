import { useEffect } from 'react'
import GradientButton from '../components/GradientButton.jsx'
import logo from '../assets/logo.svg'

function Career() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return (
    <section id="career" className="relative overflow-hidden py-12 md:py-20">
      <div className="mx-auto w-full max-w-[1200px] px-4 md:px-6">
        {/* Hero Section */}
        <div className="text-center mb-16 md:mb-24 ">
          <span className="inline-flex items-center gap-2 rounded-sm bg-[#EDE9FE] px-3 py-1 text-xs font-semibold text-primary ring-1 ring-slate-200 tracking-widest uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-[#8b5cf6]" />
            Career
          </span>
          <h1 className="mt-5 text-4xl font-semibold tracking-wide leading-tight text-slate-900 md:text-6xl">
            Analytics Engineer
            <span className="block mt-2 flex justify-center">
              <img 
                src={logo} 
                alt="Demografy Logo" 
                className="h-10 w-auto md:h-14"
              />
            </span>
          </h1>
        </div>

        <div className="shadow-xl rounded-2xl px-6 py-8 bg-white sm:px-9 sm:py-12">

        {/* About Demografy */}
        <div className="mb-16 md:mb-20">
          <h2 className="text-2xl font-semibold text-slate-900 md:text-4xl mb-6">About Demografy</h2>
          <p className="text-base text-[#374151] md:text-lg leading-relaxed">
            Demografy is revolutionising Australian property insights through data-driven intelligence. We're building the
            smartest suburb search platform in Australia, transforming complex property data into actionable insights for
            investors, homebuyers, and real estate professionals. By integrating data from Domain, realestate.com.au, ABS,
            and local government sources, we're helping Australians make confident property decisions backed by hard numbers,
            not hunches.
          </p>
        </div>

        {/* The Role */}
        <div className="mb-16 md:mb-20">
          <h2 className="text-2xl font-semibold text-slate-900 md:text-4xl mb-6">The Role</h2>
          <p className="text-base text-[#374151] md:text-lg leading-relaxed">
            We're seeking an experienced Analytics Engineer to join our growing data team. You'll be instrumental in
            building and maintaining the data infrastructure that powers our suburb analytics platform, turning raw property
            and demographic data into the insights that drive smarter property decisions across Australia.
          </p>
        </div>

        {/* Key Responsibilities */}
        <div className="mb-16 md:mb-20">
          <h2 className="text-2xl font-semibold text-slate-900 md:text-4xl mb-8">Key Responsibilities</h2>

          <div className="space-y-8">
            {/* Data Infrastructure & Pipeline Development */}
            <div>
              <h3 className="text-xl font-semibold text-slate-900 mb-4 md:text-2xl">
                Data Infrastructure & Pipeline Development
              </h3>
              <ul className="space-y-3 text-base text-[#374151] md:text-lg list-disc list-inside ml-4">
                <li>
                  Design, build, and maintain scalable data pipelines in Google Cloud Platform (GCP) using Dataform and
                  BigQuery
                </li>
                <li>
                  Develop efficient ETL/ELT processes to ingest data from multiple sources including ABS, Domain,
                  realestate.com.au, and government databases
                </li>
                <li>
                  Ensure data quality, reliability, and freshness across all pipelines with automated monitoring and alerting
                </li>
                <li>
                  Optimise BigQuery performance and costs through effective partitioning, clustering, and query optimisation
                </li>
              </ul>
            </div>

            {/* Analytics & KPI Development */}
            <div>
              <h3 className="text-xl font-semibold text-slate-900 mb-4 md:text-2xl">Analytics & KPI Development</h3>
              <ul className="space-y-3 text-base text-[#374151] md:text-lg list-disc list-inside ml-4">
                <li>
                  Collaborate with product teams to define and implement key performance indicators for suburb growth
                  tracking, livability scores, and investment metrics
                </li>
                <li>
                  Design and calculate complex KPIs including capital growth projections, proximity indices, and demographic
                  trend indicators
                </li>
                <li>
                  Build reusable data models that support our Growth Heatmaps, Suburb Profiles, and Comparison features
                </li>
                <li>Develop statistical models to power our growth prediction algorithms</li>
              </ul>
            </div>

            {/* Geospatial Data Expertise */}
            <div>
              <h3 className="text-xl font-semibold text-slate-900 mb-4 md:text-2xl">Geospatial Data Expertise</h3>
              <ul className="space-y-3 text-base text-[#374151] md:text-lg list-disc list-inside ml-4">
                <li>
                  Work extensively with ABS Statistical Areas (SA1-SA4) and other geographical divisions to ensure accurate
                  suburb-level analytics
                </li>
                <li>
                  Implement geospatial calculations for proximity analysis, catchment areas, and location-based features
                </li>
                <li>
                  Maintain geographical data integrity across different boundary systems and updates
                </li>
              </ul>
            </div>

            {/* Data Visualisation & Product Development */}
            <div>
              <h3 className="text-xl font-semibold text-slate-900 mb-4 md:text-2xl">
                Data Visualisation & Product Development
              </h3>
              <ul className="space-y-3 text-base text-[#374151] md:text-lg list-disc list-inside ml-4">
                <li>
                  Create and maintain Looker dashboards and reports for internal stakeholders and client-facing analytics
                </li>
                <li>
                  Partner with product managers and engineers to integrate analytics into our platform features
                </li>
                <li>Support the development of white-labelled reports for our Agency tier customers</li>
                <li>
                  Enable self-service analytics for internal teams through well-documented data models
                </li>
              </ul>
            </div>

            {/* Cross-functional Collaboration */}
            <div>
              <h3 className="text-xl font-semibold text-slate-900 mb-4 md:text-2xl">Cross-functional Collaboration</h3>
              <ul className="space-y-3 text-base text-[#374151] md:text-lg list-disc list-inside ml-4">
                <li>
                  Work closely with engineering teams to ensure smooth data integration into production systems
                </li>
                <li>
                  Collaborate with product teams to understand user needs and translate them into data solutions
                </li>
                <li>
                  Partner with customer success to understand how clients use our data and identify improvement opportunities
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Required Skills & Experience */}
        <div className="mb-16 md:mb-20">
          <h2 className="text-2xl font-semibold text-slate-900 md:text-4xl mb-8">Required Skills & Experience</h2>

          <div className="space-y-8">
            {/* Technical Skills */}
            <div>
              <h3 className="text-xl font-semibold text-slate-900 mb-4 md:text-2xl">Technical Skills</h3>
              <ul className="space-y-3 text-base text-[#374151] md:text-lg list-disc list-inside ml-4">
                <li>Strong proficiency in BigQuery: Advanced SQL skills, performance optimisation, and cost management</li>
                <li>Dataform expertise: Building and maintaining data transformation workflows</li>
                <li>GCP ecosystem: Experience with Cloud Storage, Pub/Sub, Cloud Functions, and IAM</li>
                <li>
                  Deep understanding of Australian geographic data: ABS Statistical Areas, geographical divisions, and
                  boundary systems
                </li>
                <li>Data visualisation: Proficiency in Looker for creating insightful dashboards and reports</li>
                <li>Programming: Python or similar for data processing and automation</li>
                <li>Version control: Git workflows and CI/CD practices</li>
              </ul>
            </div>

            {/* Analytics Experience */}
            <div>
              <h3 className="text-xl font-semibold text-slate-900 mb-4 md:text-2xl">Analytics Experience</h3>
              <ul className="space-y-3 text-base text-[#374151] md:text-lg list-disc list-inside ml-4">
                <li>2+ years of experience in analytics engineering or similar data-focussed roles</li>
                <li>Proven track record of designing and implementing KPIs that drive business decisions</li>
                <li>Experience with statistical analysis and predictive modelling</li>
                <li>Understanding of data warehouse design patterns and dimensional modelling</li>
              </ul>
            </div>

            {/* Domain Knowledge */}
            <div>
              <h3 className="text-xl font-semibold text-slate-900 mb-4 md:text-2xl">Domain Knowledge (Preferred)</h3>
              <ul className="space-y-3 text-base text-[#374151] md:text-lg list-disc list-inside ml-4">
                <li>Familiarity with Australian property market data and metrics</li>
                <li>Understanding of real estate investment calculations (yield, capital growth, etc.)</li>
                <li>Experience working with demographic and census data</li>
              </ul>
            </div>

            {/* Soft Skills */}
            <div>
              <h3 className="text-xl font-semibold text-slate-900 mb-4 md:text-2xl">Soft Skills</h3>
              <ul className="space-y-3 text-base text-[#374151] md:text-lg list-disc list-inside ml-4">
                <li>Strong problem-solving abilities with attention to detail</li>
                <li>
                  Excellent communication skills to explain complex data concepts to non-technical stakeholders
                </li>
                <li>Product-minded approach with focus on end-user value</li>
                <li>
                  Ability to work autonomously whilst collaborating effectively in a remote-first environment
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* What We Offer */}
        <div className="mb-16 md:mb-20">
          <h2 className="text-2xl font-semibold text-slate-900 md:text-4xl mb-6">What We Offer</h2>
          <ul className="space-y-3 text-base text-[#374151] md:text-lg list-disc list-inside ml-4">
            <li>Flexible, remote-first work environment</li>
            <li>
              Opportunity to shape the data infrastructure of Australia's leading property insights platform
            </li>
            <li>Work with cutting-edge data technologies and massive datasets</li>
            <li>Direct impact on product development and business strategy</li>
          </ul>
        </div>

        {/* Our Tech Stack */}
        <div className="mb-16 md:mb-20">
          <h2 className="text-2xl font-semibold text-slate-900 md:text-4xl mb-6">Our Tech Stack</h2>
          <ul className="space-y-3 text-base text-[#374151] md:text-lg list-disc list-inside ml-4">
            <li>
              <strong>Data Platform:</strong> Google Cloud Platform, BigQuery, Dataform
            </li>
            <li>
              <strong>Visualisation:</strong> Looker, custom React components
            </li>
            <li>
              <strong>Integration:</strong> APIs from Domain, realestate.com.au, ABS
            </li>
            <li>
              <strong>Infrastructure:</strong> Terraform, GitHub Actions
            </li>
            <li>
              <strong>Monitoring:</strong> Cloud Monitoring, custom alerting
            </li>
          </ul>
        </div>

        {/* How to Apply */}
        <div className="mb-16 md:mb-20">
          <h2 className="text-2xl font-semibold text-slate-900 md:text-4xl mb-6">How to Apply</h2>
          <p className="text-base text-[#374151] md:text-lg leading-relaxed mb-6">
            Send your CV and a brief note about why you're excited about Demografy to{' '}
            <a
              href="mailto:info@demografy.com.au"
              className="text-primary font-semibold hover:underline transition-colors"
            >
              info@demografy.com.au
            </a>
            . Include links to any relevant projects, GitHub repos, or data visualisations you've created.
          </p>
          <p className="text-sm text-[#6B7280] md:text-base italic">
            Demografy is committed to building a diverse and inclusive team. We encourage applications from people of all
            backgrounds, experiences, and perspectives.
          </p>
        </div>


        {/* CTA Section */}
        <div className="text-center py-12 md:py-16 bg-slate-50 rounded-2xl px-6">
          <h3 className="text-2xl font-semibold text-slate-900 mb-4 md:text-3xl">
            Ready to join the team?
          </h3>
          <p className="text-base text-[#374151] mb-8 md:text-lg max-w-2xl mx-auto">
            If you're passionate about data, property insights, and building something that matters, we'd love to hear from
            you.
          </p>
          <GradientButton
            onClick={() => {
              window.location.href = 'mailto:info@demografy.com.au?subject=Analytics Engineer Application'
            }}
          >
            Apply Now
          </GradientButton>
        </div>
        </div>

      </div>
    </section>
  )
}

export default Career

