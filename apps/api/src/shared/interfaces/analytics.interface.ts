// ============================================================
// Analytics 서비스 인터페이스 (LOCKED)
// 예측 분석 및 GIS 인터페이스

export interface PredictionInput {
  caseId: string;
  caseType: string;
  courtName?: string;
  judgeName?: string;
  claimAmount: number;
  plaintiffCount: number;
}

export interface PredictionResult {
  caseId: string;
  winProbability: number;      // 0-1
  dismissalRisk: number;       // 0-1
  estimatedDays: number;
  recommendAction: 'PROCEED_TRIAL' | 'SETTLE_NOW' | 'NEGOTIATE' | 'DISMISS';
  confidence: number;
  factors: PredictionFactor[];
}

export interface PredictionFactor {
  name: string;
  impact: number;  // -1 to 1
  description: string;
}

export interface CBAResult {
  caseId: string;
  trialCostEstimate: number;
  settleCostEstimate: number;
  trialExpectedValue: number;
  settleExpectedValue: number;
  recommendation: 'TRIAL' | 'SETTLE';
  breakEvenPoint: number;
}

export interface GISHotspot {
  id: string;
  center: { lat: number; lng: number };
  radius: number; // km
  plaintiffCount: number;
  density: number;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
}

export interface GISLayer {
  id: string;
  name: string;
  type: 'HEATMAP' | 'CLUSTER' | 'POLYGON' | 'POINT';
  dataSource: string;
  visible: boolean;
}

export interface GISMapData {
  caseId: string;
  hotspots: GISHotspot[];
  layers: GISLayer[];
  bounds: {
    north: number;
    south: number;
    east: number;
    west: number;
  };
}

export interface IAnalyticsService {
  predictOutcome(input: PredictionInput): Promise<PredictionResult>;
  calculateCBA(caseId: string): Promise<CBAResult>;
  getGISData(caseId: string): Promise<GISMapData>;
  detectHotspots(caseId: string): Promise<GISHotspot[]>;
}
