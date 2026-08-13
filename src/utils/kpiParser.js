import kpiData from "../data/Dataset_KPI_Dictionary.json";
import {
  Gem,
  Globe2,
  Plane,
  GraduationCap,
  Building2,
  Home,
  DollarSign,
  Scale,
  TrendingUp,
  Users,
  Briefcase,
  Activity,
  Shield,
  Layers,
} from "lucide-react";

// Map KPI field names to Dashboard keys
const fieldNameToKey = {
  kpi_1_val: "prosperityScore",
  kpi_2_val: "diversityIndex",
  kpi_3_val: "migrationFootprint",
  kpi_4_val: "learningLevel",
  kpi_5_val: "socialHousing",
  kpi_6_val: "residentEquity",
  kpi_7_val: "rentalAccess",
  kpi_8_val: "residentAnchor",
  kpi_9_val: "mobilityPotential",
  kpi_10_val: "youngFamily",
  kpi_11_val: "disadvantageConcentration",
  kpi_12_val: "retireeDownsizer",
  kpi_13_val: "housingDensityMix",
  kpi_14_val: "premiumRental",
};

// Map KPI names to lucide-react icon components
const kpiIcons = {
  "Prosperity Score": Gem,
  "Diversity Index": Globe2,
  "Migration Footprint": Plane,
  "Learning Level": GraduationCap,
  "Social Housing": Building2,
  "Resident Equity": Home,
  "Rental Access": DollarSign,
  "Resident Anchor": Scale,
  "Household Mobility Potential": TrendingUp,
  "Young Family Indicator": Users,
  "Disadvantage Concentration Index": Scale,
  "Retiree & Downsizer Index": Users,
  "Housing Density Mix Index": Building2,
  "Premium Rental Index": DollarSign,
};

/**
 * Parses the messy KPI dictionary JSON and reconstructs complete KPI definitions
 */
export function parseKPIDefinitions() {
  const kpiMap = {};
  let currentKPIKey = null;

  // Process each entry and reconstruct split data
  kpiData.forEach((item) => {
    const fieldName = item["Field Name"]?.trim() || "";

    // If this is a new KPI field name, start a new entry
    if (fieldName.startsWith("kpi_") && fieldName.endsWith("_val")) {
      const key = fieldNameToKey[fieldName];
      if (key) {
        currentKPIKey = key;
        kpiMap[key] = {
          fieldName,
          source: item["Source"] || "",
          kpiName: item["KPI Name"] || "",
          calculation: item["KPI calculation"] || "",
          metricNote: item["Metric note"] || "",  
          ranking: item["Ranking"] || "",
          indexCalculation: item["Index Calculation"] || "",
        };
      }
    } else if (currentKPIKey && kpiMap[currentKPIKey]) {
      const current = kpiMap[currentKPIKey];

      const source = item["Source"]?.trim() || "";
      if (
        source &&
        source.length > 20 &&
        !source.match(/^\d+$/) &&
        !source.includes("(X-min)")
      ) {
        if (!current.metricNote) {
          current.metricNote = source;
        } else {
          current.metricNote += " " + source;
        }
      }

      const kpiName = item["KPI Name"]?.trim() || "";
      if (
        kpiName &&
        (kpiName.includes("High to") || kpiName.includes("Low to"))
      ) {
        if (!current.ranking) {
          current.ranking = kpiName;
        }
      }

      // Check Ranking field
      const ranking = item["Ranking"]?.trim() || "";
      if (
        ranking &&
        (ranking.includes("High to") || ranking.includes("Low to"))
      ) {
        if (!current.ranking) {
          current.ranking = ranking;
        }
      }

      // Merge calculation if it's a continuation
      const calc = item["KPI calculation"]?.trim() || "";
      if (
        calc &&
        calc !== "(X-min)/(max-min)" &&
        calc !== "(max-X)/(max-min)"
      ) {
        if (calc.includes("/") || calc.includes("*") || calc.includes("+")) {
          current.calculation += " " + calc;
        }
      }

      // Check if Metric note has data
      const metricNote = item["Metric note"]?.trim() || "";
      if (metricNote && metricNote.length > 10) {
        if (!current.metricNote) {
          current.metricNote = metricNote;
        } else if (!current.metricNote.includes(metricNote)) {
          current.metricNote += " " + metricNote;
        }
      }

      // Check Index Calculation
      const indexCalc = item["Index Calculation"]?.trim() || "";
      if (
        indexCalc &&
        (indexCalc.includes("(X-min)") || indexCalc.includes("(max-X)"))
      ) {
        if (!current.indexCalculation) {
          current.indexCalculation = indexCalc;
        }
      }
    }
  });

  // Now build the final definitions
  const definitions = {};

  Object.entries(kpiMap).forEach(([key, kpi]) => {
    if (!kpi.kpiName) return;

    // Clean up the data
    let metricNote = (kpi.metricNote || "").replace(/^["']|["']$/g, "").trim();
    let ranking = (kpi.ranking || "").trim();
    let calculation = (kpi.calculation || "")
      .replace(/^["']|["']$/g, "")
      .trim();

    // Extract ranking from various places if not found
    if (!ranking || (!ranking.includes("High") && !ranking.includes("Low"))) {
      // Try to extract from metric note or other fields
      const rankingMatch = metricNote.match(
        /(High to low|Low to high|High to Low|Low to High)/i,
      );
      if (rankingMatch) {
        ranking = rankingMatch[1];
      }
    }

    // For kpi_2_val, the ranking might be in the metric note continuation
    if (
      key === "diversityIndex" &&
      !ranking.includes("High") &&
      !ranking.includes("Low")
    ) {
      ranking = "High to low"; // Default based on the pattern
    }

    // Determine if higher is better
    const higher = ranking.toLowerCase().includes("high to low");

    // Generate short name
    const shortName =
      kpi.kpiName.length > 15
        ? kpi.kpiName
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase())
            .join("")
            .slice(0, 12)
        : kpi.kpiName;

    // Determine format function
    const format = (val) => {
      const num = typeof val === 'number' ? val : parseFloat(val);
      const safeVal = isNaN(num) ? 0 : num;
      if (
        metricNote.includes("0 to 100%") ||
        metricNote.includes("varies from 0 to 100%") ||
        kpi.kpiName.includes("Footprint") ||
        kpi.kpiName.includes("Equity") ||
        kpi.kpiName.includes("Housing") ||
        kpi.kpiName.includes("Access") ||
        kpi.kpiName.includes("Anchor") ||
        kpi.kpiName.includes("Learning") ||
        kpi.kpiName.includes("Mobility") ||
        kpi.kpiName.includes("Family") ||
        kpi.kpiName.includes("Force") ||
        kpi.kpiName.includes("Concentration") ||
        kpi.kpiName.includes("Retiree") ||
        kpi.kpiName.includes("Density") ||
        kpi.kpiName.includes("Premium") ||
        kpi.kpiName.includes("KPI")
      ) {
        return `${safeVal.toFixed(1)}%`;
      }
      if (
        metricNote.includes("0 to 1") ||
        metricNote.includes("varies from 0 to 1") ||
        kpi.kpiName.includes("Diversity")
      ) {
        return safeVal.toFixed(3);
      }
      if (metricNote.includes("1000") || kpi.kpiName.includes("Prosperity")) {
        return safeVal.toFixed(0);
      }
      return safeVal.toFixed(1);
    };

    const IconComponent = kpiIcons[kpi.kpiName] || Scale;

    definitions[key] = {
      name: kpi.kpiName,
      shortName,
      icon: IconComponent,
      higher,
      format,
      description: metricNote || kpi.kpiName,
      fieldName: kpi.fieldName,
      source: kpi.source,
      calculation: calculation || kpi.calculation,
      indexCalculation: kpi.indexCalculation || "(X-min)/(max-min)",
    };
  });

  return definitions;
}

/**
 * Gets the field name (kpi_X_val) from a Dashboard key
 */
export function getFieldNameFromKey(key) {
  const entry = Object.entries(fieldNameToKey).find(
    ([, value]) => value === key,
  );
  return entry ? entry[0] : null;
}

/**
 * Gets the Dashboard key from a field name (kpi_X_val)
 */
export function getKeyFromFieldName(fieldName) {
  return fieldNameToKey[fieldName] || null;
}

export default parseKPIDefinitions;
