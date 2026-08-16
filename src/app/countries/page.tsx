import { CountryGrid } from '@/components/countries/CountryGrid'
import { countriesIndex } from '@/lib/country-data'

export const metadata = { title: 'Explore Countries | Indian Diplomatic Relations' }

export default async function CountriesPage({
  searchParams,
}: {
  searchParams: Promise<{ region?: string }>
}) {
  const { region } = await searchParams

  return (
    <div className="min-h-screen bg-primary">
      <header className="pt-16 pb-12 bg-primary-light border-b border-muted-blue/30">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-off-white mb-4">
            Explore Countries
          </h1>
          <p className="text-off-white/70 max-w-2xl mx-auto">
            Browse and filter India&rsquo;s diplomatic relationships across all {countriesIndex.length} tracked countries and territories. Click on any country to explore its full profile.
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <CountryGrid initialCountries={countriesIndex} initialRegion={region} />
      </main>
    </div>
  )
}
