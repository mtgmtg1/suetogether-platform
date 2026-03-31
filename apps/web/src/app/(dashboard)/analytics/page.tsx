// [Flow: Dashboard Load -> Render Map Placeholder -> Overlay Heatmap Data -> Render Detail Panel]
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Filter, MapPin, Search, Layers, TrendingUp } from "lucide-react";

export default function AnalyticsGISPage() {
  const regions = [
    { name: "서울특별시 강남구", count: 342, severity: "high", change: "+12%" },
    { name: "경기도 성남시 분당구", count: 218, severity: "high", change: "+5%" },
    { name: "인천광역시 연수구", count: 156, severity: "medium", change: "-2%" },
    { name: "부산광역시 해운대구", count: 94, severity: "low", change: "+0%" },
    { name: "대구광역시 수성구", count: 87, severity: "low", change: "+8%" },
  ];

  return (
    <div className="space-y-6 pt-4 max-w-7xl mx-auto w-full flex flex-col h-[calc(100vh-80px)]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shrink-0">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-white">공간데이터 분석 (GIS)</h1>
          <p className="text-sm text-zinc-400 mt-1">
            가습기 살균제 집단소송 원고들의 지역적 분포 및 피해 심각도를 분석합니다.
          </p>
        </div>
        <div className="flex gap-2">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input 
              type="text" 
              placeholder="지역구명 검색..." 
              className="h-9 bg-white/5 border border-white/10 rounded-full pl-9 pr-4 text-sm text-zinc-200 placeholder:text-zinc-500 focus:outline-none focus:ring-1 focus:ring-blue-500/50"
            />
          </div>
          <Button variant="outline" className="border-white/10 text-white bg-white/5 hover:bg-white/10">
            <Filter className="w-4 h-4 mr-2" />
            필터
          </Button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col lg:flex-row gap-6 flex-1 min-h-0">
        
        {/* Left: Interactive Map Viewer */}
        <Card className="flex-1 border-white/10 bg-black/40 backdrop-blur-xl relative overflow-hidden flex flex-col">
          <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
            <Button variant="outline" size="icon" className="bg-black/50 border-white/10 text-white hover:bg-white/10 backdrop-blur-md">
              <Layers className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="icon" className="bg-black/50 border-white/10 text-white hover:bg-white/10 backdrop-blur-md">
              <MapPin className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="absolute bottom-4 left-4 z-10 bg-black/50 backdrop-blur-md border border-white/10 rounded-lg p-3 text-xs">
            <div className="font-medium text-white mb-2">밀도 범례</div>
            <div className="flex gap-1 items-center">
              <span className="text-zinc-400 mr-2">낮음</span>
              <div className="w-4 h-4 bg-emerald-500/50 rounded-sm" />
              <div className="w-4 h-4 bg-amber-500/50 rounded-sm" />
              <div className="w-4 h-4 bg-rose-500/50 rounded-sm" />
              <div className="w-4 h-4 bg-purple-500/50 rounded-sm" />
              <span className="text-zinc-400 ml-2">매우 높음</span>
            </div>
          </div>

          <CardContent className="flex-1 p-0 m-0 h-full relative">
            {/* Map Placeholder */}
            <div className="absolute inset-0 bg-[#0a0f18] opacity-80" style={{
              backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(37, 99, 235, 0.1) 0%, transparent 60%), linear-gradient(#1e293b 1px, transparent 1px), linear-gradient(90deg, #1e293b 1px, transparent 1px)',
              backgroundSize: '100% 100%, 20px 20px, 20px 20px'
            }} />
            
            {/* Fake Heatmap Nodes */}
            <div className="absolute top-[35%] left-[60%] w-32 h-32 bg-rose-500/30 blur-2xl rounded-full" />
            <div className="absolute top-[40%] left-[58%] w-8 h-8 bg-rose-500/80 rounded-full animate-pulse border-2 border-white/20 shadow-[0_0_15px_rgba(244,63,94,0.5)] flex items-center justify-center">
              <span className="text-[10px] font-bold text-white">342</span>
            </div>

            <div className="absolute top-[45%] left-[63%] w-24 h-24 bg-amber-500/30 blur-2xl rounded-full" />
            <div className="absolute top-[47%] left-[65%] w-6 h-6 bg-amber-500/80 rounded-full border border-white/20 flex items-center justify-center">
              <span className="text-[9px] font-bold text-white">218</span>
            </div>

            <div className="absolute top-[20%] left-[30%] w-20 h-20 bg-emerald-500/20 blur-xl rounded-full" />
            <div className="absolute top-[22%] left-[32%] w-5 h-5 bg-emerald-500/60 rounded-full border border-white/20" />
            
            {/* Placeholder Text */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="text-zinc-600 font-medium tracking-widest text-lg opacity-30">대화형 GIS 지도 렌더링 영역</span>
            </div>
          </CardContent>
        </Card>

        {/* Right: Analytics Panel */}
        <div className="w-full lg:w-96 flex flex-col gap-6 shrink-0 overflow-y-auto pr-2">
          {/* Top States */}
          <Card className="border-white/10 bg-black/40 backdrop-blur-xl shrink-0">
            <CardHeader className="pb-3 border-b border-white/5">
              <CardTitle className="text-sm font-medium">핫스팟 (밀집 지역)</CardTitle>
            </CardHeader>
            <CardContent className="pt-4 p-0">
              <ul className="divide-y divide-white/5">
                {regions.map((region, idx) => (
                  <li key={idx} className="p-4 flex items-center justify-between hover:bg-white/5 transition-colors cursor-pointer">
                    <div>
                      <h4 className="text-sm font-medium text-zinc-200">{region.name}</h4>
                      <p className="text-xs text-zinc-500 mt-1 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        원고 {region.count}명
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${
                        region.severity === "high" ? "bg-rose-500/10 text-rose-400 border border-rose-500/20" :
                        region.severity === "medium" ? "bg-amber-500/10 text-amber-400 border border-amber-500/20" :
                        "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                      }`}>
                        위험도 {region.severity === "high" ? "상" : region.severity === "medium" ? "중" : "하"}
                      </span>
                      <span className={`text-xs font-medium flex items-center ${
                        region.change.startsWith("+") && region.change !== "+0%" ? "text-rose-400" :
                        region.change.startsWith("-") ? "text-blue-400" : "text-zinc-500"
                      }`}>
                        {region.change !== "+0%" && <TrendingUp className="w-3 h-3 mr-0.5" />}
                        {region.change}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Demographic summary */}
          <Card className="border-white/10 bg-black/40 backdrop-blur-xl shrink-0">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">주요 클러스터 분석 개요</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-zinc-400 leading-relaxed">
                서울/경기 남부 지역에 원고의 <strong className="text-white">68%</strong>가 밀집되어 있습니다. 
                특히 강남구 및 분당구 클러스터의 경우 최근 일주일 새 접수 비율이 <strong className="text-rose-400 font-medium">12% 급증</strong>하여 우선적인 법리 검토 및 안내가 필요합니다.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
