import { Injectable, Logger } from '@nestjs/common';
import { GISHotspot, GISMapData } from '../../shared/interfaces/analytics.interface';
import { PrismaService } from '../../core/prisma.service';

@Injectable()
export class GISService {
  private readonly logger = new Logger(GISService.name);

  constructor(private readonly prisma: PrismaService) {}

  async getGISData(tenantId: string, caseId: string): Promise<GISMapData> {
    this.logger.log(`Fetching GIS Data for case: ${caseId}`);

    // In a real scenario, this would generate/fetch actual data.
    // We mock hotspot detection here.
    const hotspots = await this.detectHotspots(tenantId, caseId);

    return {
      caseId,
      hotspots,
      layers: [
        { id: 'l1', name: 'Heatmap', type: 'HEATMAP', dataSource: 'plaintiff_density', visible: true },
        { id: 'l2', name: 'Clusters', type: 'CLUSTER', dataSource: 'plaintiff_clusters', visible: false },
      ],
      bounds: {
        north: 37.78, south: 37.76, east: -122.40, west: -122.42,
      },
    };
  }

  async detectHotspots(tenantId: string, caseId: string): Promise<GISHotspot[]> {
    this.logger.log(`Detecting hotspots for case: ${caseId}`);

    // Fetch case and plaintiffs from DB
    const caseData = await this.prisma.case.findFirst({
      where: { id: caseId, tenantId },
      include: { plaintiffs: true },
    });

    if (!caseData) {
      throw new Error(`Case ${caseId} not found`);
    }

    // Mock hotspots generation based on plaintiff count
    const count = caseData.plaintiffs.length || 1;

    // Generating mock coordinates for hotspots
    const hotspots: GISHotspot[] = [];

    // Simplified hotspot logic for demonstration
    for(let i = 0; i < Math.min(count, 3); i++) {
        // Mocking some center
        const center = { lat: 37.7749 + (i * 0.01), lng: -122.4194 + (i * 0.01) };
        const radius = 2.5; // km
        const pCount = Math.max(1, Math.floor(count / 3));
        const density = pCount / (Math.PI * Math.pow(radius, 2));

        let severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
        if (density > 50) severity = 'CRITICAL';
        else if (density > 20) severity = 'HIGH';
        else if (density > 5) severity = 'MEDIUM';
        else severity = 'LOW';

        hotspots.push({
            id: `hs-${i+1}`,
            center,
            radius,
            plaintiffCount: pCount,
            density,
            severity,
        });
    }

    return hotspots;
  }

  // Helper method for Haversine distance
  calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Earth's radius in km
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  private deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
  }
}
