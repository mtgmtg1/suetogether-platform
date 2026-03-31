// [Flow: Dashboard Index -> Fetch Metrics -> Render Stat Cards -> Render Chart]
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Users, Scale, AlertTriangle, TrendingUp } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-6 flex flex-col pt-4">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-50">워크스페이스 개요</h1>
        <p className="text-sm text-zinc-400 mt-1">
          현재 진행 중인 집단분쟁 사건 요약 및 소송 핵심 지표입니다.
        </p>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "전체 사건", value: "24건", desc: "+2건 이번 주", icon: BriefcaseIcon },
          { label: "참여 원고", value: "1,240명", desc: "45명 자격 검토 중", icon: Users },
          { label: "증거 검증률", value: "85%", desc: "15% AI 수동 검토 대기", icon: Activity },
          { label: "예상 합의금 총액", value: "₩14.2B", desc: "분석 모델 컨피던스 92%", icon: TrendingUp },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <Card key={i} className="bg-black/40 border-white/10 backdrop-blur-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl group-hover:bg-blue-500/10 transition-colors" />
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 z-10 relative">
                <CardTitle className="text-sm font-medium text-zinc-400">
                  {stat.label}
                </CardTitle>
                <Icon className="h-4 w-4 text-zinc-500" />
              </CardHeader>
              <CardContent className="z-10 relative">
                <div className="text-2xl font-bold tracking-tight text-white">{stat.value}</div>
                <p className="text-xs text-zinc-500 mt-1">{stat.desc}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Content Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border-white/10 bg-black/40 backdrop-blur-xl">
          <CardHeader>
            <CardTitle>최근 발생 사건 추이 (Intake)</CardTitle>
            <CardDescription className="text-zinc-400">최근 30일간 접수된 신규 리드 및 유효 원고 현황</CardDescription>
          </CardHeader>
          <CardContent className="h-72 flex items-center justify-center border border-dashed border-white/5 rounded-lg m-6 mt-0">
            {/* Chart Placeholder */}
            <div className="flex flex-col items-center gap-2 text-zinc-500">
              <Activity className="w-8 h-8 opacity-50" />
              <span className="text-sm">데이터 시각화 차트가 렌더링됩니다</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-white/10 bg-black/40 backdrop-blur-xl flex flex-col">
          <CardHeader>
            <CardTitle>법무법인 To-Do</CardTitle>
            <CardDescription className="text-zinc-400">조치가 필요한 시급한 태스크</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col gap-4">
            {[
              { title: "가습기 살균제 집단소송", msg: "새로운 증거 4건 VLM 판독 불일치", time: "1시간 전", highlight: true },
              { title: "테슬라 허위광고 건", msg: "원고 12명 은행계좌 인증 실패", time: "3시간 전", highlight: false },
              { title: "A통신사 정보유출", msg: "펌뱅킹 대량이체 배치 실행 준비 대기", time: "어제", highlight: false },
            ].map((alert, i) => (
              <div key={i} className="flex gap-3 items-start p-3 rounded-lg border border-white/5 bg-white/5 hover:bg-white/10 transition-colors">
                <div className="mt-0.5">
                  {alert.highlight ? (
                    <AlertTriangle className="w-4 h-4 text-rose-500" />
                  ) : (
                    <Scale className="w-4 h-4 text-blue-400" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-zinc-200 truncate">{alert.title}</p>
                  <p className="text-xs text-zinc-400 mt-0.5 line-clamp-2">{alert.msg}</p>
                  <p className="text-[10px] text-zinc-500 mt-1">{alert.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function BriefcaseIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      <rect width="20" height="14" x="2" y="6" rx="2" />
    </svg>
  );
}
