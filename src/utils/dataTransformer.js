import masterData from '../data/Dataset_Master_Table.json'
import { getKeyFromFieldName } from './kpiParser.js'

// Map state names to abbreviations
const stateAbbreviation = {
  'New South Wales': 'NSW',
  'Victoria': 'VIC',
  'Queensland': 'QLD',
  'Western Australia': 'WA',
  'South Australia': 'SA',
  'Tasmania': 'TAS',
  'Northern Territory': 'NT',
  'Australian Capital Territory': 'ACT',
}

// Extract region type from gcca_name or sa4_name
function getRegionType(gccaName, sa4Name) {
  if (!gccaName && !sa4Name) return 'Major Cities'
  
  const name = (gccaName || sa4Name).toLowerCase()
  if (name.includes('major cities') || name.includes('capital')) {
    return 'Major Cities'
  }
  if (name.includes('inner regional')) {
    return 'Inner Regional'
  }
  if (name.includes('outer regional')) {
    return 'Outer Regional'
  }
  if (name.includes('remote')) {
    return 'Remote'
  }
  if (name.includes('very remote')) {
    return 'Very Remote'
  }
  return 'Major Cities' // Default
}

// Map KPI values from kpi_X_val to Dashboard keys (moved outside function for performance)
const kpiMapping = {
  kpi_1_val: 'prosperityScore',
  kpi_2_val: 'diversityIndex',
  kpi_3_val: 'migrationFootprint',
  kpi_4_val: 'learningLevel',
  kpi_5_val: 'socialHousing',
  kpi_6_val: 'residentEquity',
  kpi_7_val: 'rentalAccess',
  kpi_8_val: 'residentAnchor',
}

/**
 * Transforms the master table JSON data into Dashboard format
 * Optimized for performance with pre-defined mapping
 */
export function transformMasterData() {
  const result = []
  const dataLength = masterData.length

  for (let index = 0; index < dataLength; index += 1) {
    const item = masterData[index]
    const row = {
      id: index + 1,
      sa2Name: item.sa2_name || '',
      sa2Code: item.sa2_code || '',
      sa3Name: item.sa3_name || '',
      sa3Code: item.sa3_code || '',
      sa4Name: item.sa4_name || '',
      state: stateAbbreviation[item.state] || item.state || '',
      stateFull: item.state || '',
      lga: item.sa3_name || '', // Using sa3_name as LGA approximation
      region: getRegionType(item.gcca_name, item.sa4_name),
      population: parseInt(item.population, 10) || 0,
      area: parseFloat(item.area) || 0,
    }

    // Add KPI values using direct mapping for better performance
    row.prosperityScore = parseKPIValue(item.kpi_1_val)
    row.diversityIndex = parseKPIValue(item.kpi_2_val)
    row.migrationFootprint = parseKPIValue(item.kpi_3_val)
    row.learningLevel = parseKPIValue(item.kpi_4_val)
    row.socialHousing = parseKPIValue(item.kpi_5_val)
    row.residentEquity = parseKPIValue(item.kpi_6_val)
    row.rentalAccess = parseKPIValue(item.kpi_7_val)
    row.residentAnchor = parseKPIValue(item.kpi_8_val)

    result.push(row)
  }

  return result
}

// Helper function to parse KPI values
function parseKPIValue(value) {
  if (value === undefined || value === null || value === '') {
    return 0
  }
  const numValue = typeof value === 'string' ? parseFloat(value) : value
  return isNaN(numValue) ? 0 : numValue
}

export default transformMasterData

