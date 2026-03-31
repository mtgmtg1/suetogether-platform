// [Flow: Case Detail Render -> Header Info -> Metric Cards -> Lifecycle Timeline]
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, FileCheck, CheckCircle2, ChevronRight, AlertTriangle, ShieldCheck } from "lucide-react";

export default function CaseDetailPage() {
  const steps = [
    { id: 1, title: "사건 등록 및 리드 생성", status: "completed", date: "2026.03.15", desc: "사건 마스터 정보 생성 및 챗봇 랜딩페이지 배포" },
    { id: 2, title: "피해자 모집 (Intake)", status: "completed", date: "2026.03.20", desc: "원고 1,240명 접수 및 890명 PASS 인증 완료" },
    { id: 3, title: "증거수집 (e-Discovery)", status: "in-progress", date: "진행 중", desc: "결제 내역 및 영수증 VLM 분석 진행율 45%" },
    { id: 4, title: "법리검토 (Docs)", status: "pending", date: "대기 중", desc: "판례 리서치 및 소장 초안 생성 대기" },
    { id: 5, title: "합의 및 분배 (Escrow)", status: "pending", date: "대기 중", desc: "가상계좌 발급 및 합의금 분배 대기" },
  ];

  return (
    <div className="space-y-6 pt-4 max-w-6xl mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <button className="flex items-center text-sm text-zinc-400 hover:text-white transition-colors w-fit">
          <ArrowLeft className="w-4 h-4 mr-1" />
          사건 목록으로 돌아가기
        </button>
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-blue-500/20 text-blue-400 border border-blue-500/30">
                진행 중 (증거수집)
              </span>
              <span className="text-sm font-medium text-zinc-500">CASE #2026-KM-0142</span>
            </div>
            <h1 className="text-3xl font-semibold tracking-tight text-white mb-2">가습기 살균제 집단소송 건</h1>
            <p className="text-sm text-zinc-400 max-w-2xl">
              옥시 등 제조사를 상대로 한 손해배상 청구소송. 피부질환 및 호흡기 질환 패키지별 분리 접수 진행.
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="border-white/10 text-white bg-white/5 hover:bg-white/10">
              보고서 내보내기
            </Button>
            <Button className="bg-blue-600 text-white hover:bg-blue-500">
              <ShieldCheck className="w-4 h-4 mr-2" />
              참여자 대상 공지 발송
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Timeline (Main Content) */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-white/10 bg-black/40 backdrop-blur-xl">
            <CardHeader>
              <CardTitle>사건 생애주기 타임라인</CardTitle>
              <CardDescription className="text-zinc-400">전체 소송 파이프라인 진행 상태입니다.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative border-l border-white/10 ml-3 md:ml-4 space-y-8 py-4">
                {steps.map((step, idx) => {
                  const isLast = idx === steps.length - 1;
                  return (
                    <div key={step.id} className="relative pl-8 md:pl-10">
                      {/* Node Icon */}
                      <div className={`absolute -left-3.5 md:-left-4 top-0.5 w-7 h-7 md:w-8 md:h-8 rounded-full border-4 border-[#0a0a0a] flex items-center justify-center ${
                        step.status === "completed" ? "bg-emerald-500" :
                        step.status === "in-progress" ? "bg-blue-500 animate-pulse" :
                        "bg-zinc-800"
                      }`}>
                        {step.status === "completed" ? (
                          <CheckCircle2 className="w-4 h-4 text-[#0a0a0a]" />
                        ) : step.status === "in-progress" ? (
                          <Clock className="w-4 h-4 text-[#0a0a0a]" />
                        ) : (
                          <div className="w-2 h-2 rounded-full bg-zinc-600" />
                        )}
                      </div>
                      
                      {/* Content */}
                      <div className={`flex flex-col md:flex-row md:items-start justify-between gap-4 p-4 rounded-xl border transition-colors ${
                        step.status === "in-progress" 
                          ? "bg-blue-500/5 border-blue-500/20" 
                          : "bg-white/5 border-white/5"
                      }`}>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className={`text-base font-medium ${step.status === "pending" ? "text-zinc-500" : "text-white"}`}>
                              {step.title}
                            </h3>
                            {step.status === "in-progress" && (
                              <span className="text-[10px] font-medium text-blue-400 bg-blue-500/10 px-1.5 py-0.5 rounded">현재 활성</span>
                            )}
                          </div>
                          <p className="text-sm text-zinc-400">{step.desc}</p>
                        </div>
                        <div className="text-xs font-medium text-zinc-500 shrink-0">
                          {step.date}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <Card className="border-white/10 bg-black/40 backdrop-blur-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-3xl group-hover:bg-indigo-500/10 transition-colors" />
            <CardHeader className="relative z-10 pb-2">
              <CardTitle className="text-base text-zinc-300">참여자 통계</CardTitle>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="text-4xl font-semibold tracking-tight text-white mb-2">1,240<span className="text-lg text-zinc-500 font-normal ml-1">명</span></div>
              <div className="flex items-center justify-between text-sm py-2 border-b border-white/5">
                <span className="text-zinc-400">인증 및 수임 완료</span>
                <span className="text-white font-medium">890명 (71.7%)</span>
              </div>
              <div className="flex items-center justify-between text-sm py-2 border-b border-white/5">
                <span className="text-zinc-400">서류 보완 필요</span>
                <div className="flex items-center text-amber-500 font-medium">
                  <AlertTriangle className="w-3.5 h-3.5 mr-1" />
                  112명
                </div>
              </div>
              <div className="flex items-center justify-between text-sm py-2">
                <span className="text-zinc-400">이탈 및 취소</span>
                <span className="text-zinc-500 font-medium">238명</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-white/10 bg-black/40 backdrop-blur-xl">
            <CardHeader className="pb-3 border-b border-white/5">
              <CardTitle className="text-base font-medium flex items-center justify-between">
                <span>VLM 증거 검증 현황</span>
                <FileCheck className="w-4 h-4 text-zinc-500" />
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-sm text-zinc-300">병력 입증 서류 (진단서 등)</span>
                    <span className="text-sm font-medium text-white">45%</span>
                  </div>
                  <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-blue-500 h-full w-[45%]" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-sm text-zinc-300">제품 구매 이력 (결제 내역)</span>
                    <span className="text-sm font-medium text-white">78%</span>
                  </div>
                  <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full w-[78%]" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
