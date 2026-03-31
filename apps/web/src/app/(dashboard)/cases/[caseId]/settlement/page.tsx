// [Flow: Settlement Init -> Fetch Balance -> Render Distribution Table -> Render Chart]
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DollarSign, Send, History, Wallet, Bell, Download, Search } from "lucide-react";

export default function SettlementEscrowPage() {
  const payouts = [
    { id: "TRX-001", name: "김*수 (대표 원고)", amount: "₩25,000,000", status: "completed", date: "2026.04.10", acc: "신한 110-***-******" },
    { id: "TRX-002", name: "박*현", amount: "₩12,500,000", status: "processing", date: "2026.04.12", acc: "국민 910-***-******" },
    { id: "TRX-003", name: "이*지", amount: "₩12,500,000", status: "pending", date: "-", acc: "우리 1002-***-******" },
    { id: "TRX-004", name: "최*민", amount: "₩12,500,000", status: "failed", date: "2026.04.12", acc: "농협 352-***-****** (예금주 불일치)" },
  ];

  return (
    <div className="space-y-6 pt-4 max-w-6xl mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-white flex items-center gap-2">
            합의금 에스크로 및 분배 <span className="bg-blue-500/20 text-blue-400 text-[10px] px-2 py-0.5 rounded-full border border-blue-500/20 leading-none">FirmBanking 연동 됨</span>
          </h1>
          <p className="text-sm text-zinc-400 mt-1">
            승소 또는 합의로 예치된 금액을 원고 비율에 맞춰 자동 송금합니다.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="border-white/10 text-white bg-white/5 hover:bg-white/10">
            <Download className="w-4 h-4 mr-2" />
            내역 다운로드
          </Button>
          <Button className="bg-indigo-600 text-white hover:bg-indigo-500">
            <Send className="w-4 h-4 mr-2" />
            일괄 송금 실행
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Balance Overview */}
        <Card className="lg:col-span-3 border-white/10 bg-black/40 backdrop-blur-xl relative overflow-hidden">
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <CardContent className="pt-6 grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
            <div className="flex flex-col gap-1 border-r border-white/10 pr-6">
              <span className="text-sm font-medium text-zinc-400 flex items-center gap-1"><Wallet className="w-4 h-4" /> 에스크로 예치 총액 (승소금)</span>
              <span className="text-4xl font-bold text-white mt-1">₩14,250,000,000</span>
              <span className="text-xs text-zinc-500 mt-2">입금일: 2026.04.05 (피고인: 가습기 살균제 제조사 연합)</span>
            </div>
            
            <div className="flex flex-col gap-1 border-r border-white/10 px-6">
              <span className="text-sm font-medium text-zinc-400">송금 대기 금액 / 대상</span>
              <span className="text-2xl font-semibold text-white mt-1">₩11,200,000,000</span>
              <span className="text-sm text-amber-500 font-medium">1,120명 대기</span>
            </div>

            <div className="flex flex-col gap-1 pl-6">
              <span className="text-sm font-medium text-zinc-400">송금 완료 금액 (로펌 수수료 포함)</span>
              <span className="text-2xl font-semibold text-white mt-1">₩3,050,000,000</span>
              <span className="text-sm text-emerald-500 font-medium">120명 완료</span>
            </div>
          </CardContent>
        </Card>

        {/* Payout List */}
        <Card className="lg:col-span-2 border-white/10 bg-black/40 backdrop-blur-xl">
          <CardHeader className="flex flex-row items-center justify-between pb-3 border-b border-white/5">
            <div>
              <CardTitle>분배 대상 원고 명단</CardTitle>
              <CardDescription className="text-zinc-400">배상 비율에 따른 개별 지급액 산정 결과</CardDescription>
            </div>
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500" />
              <input 
                type="text" 
                placeholder="이름/계좌 검색" 
                className="h-8 bg-white/5 border border-white/10 rounded-md pl-8 pr-3 text-xs text-zinc-200 placeholder:text-zinc-500 focus:outline-none focus:ring-1 focus:ring-blue-500/50"
              />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-zinc-400 bg-white/5 border-b border-white/5">
                  <tr>
                    <th className="px-4 py-3 font-medium">ID</th>
                    <th className="px-4 py-3 font-medium">원고명 / 계좌</th>
                    <th className="px-4 py-3 font-medium text-right">지급액</th>
                    <th className="px-4 py-3 font-medium">상태</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {payouts.map((tx, i) => (
                    <tr key={i} className="hover:bg-white/5 transition-colors">
                      <td className="px-4 py-3 text-zinc-500">{tx.id}</td>
                      <td className="px-4 py-3">
                        <div className="font-medium text-zinc-200">{tx.name}</div>
                        <div className="text-[10px] text-zinc-500">{tx.acc}</div>
                      </td>
                      <td className="px-4 py-3 text-right font-medium text-white">{tx.amount}</td>
                      <td className="px-4 py-3">
                        {tx.status === "completed" && <span className="inline-flex items-center gap-1 text-[10px] font-medium text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-full"><History className="w-3 h-3"/> 완료 ({tx.date})</span>}
                        {tx.status === "processing" && <span className="inline-flex items-center gap-1 text-[10px] font-medium text-blue-400 bg-blue-500/10 px-2 py-1 rounded-full"><Send className="w-3 h-3"/> 펌뱅킹 전송 중</span>}
                        {tx.status === "pending" && <span className="inline-flex items-center gap-1 text-[10px] font-medium text-zinc-400 bg-zinc-800 px-2 py-1 rounded-full"><Wallet className="w-3 h-3"/> 대기</span>}
                        {tx.status === "failed" && <span className="inline-flex items-center gap-1 text-[10px] font-medium text-rose-400 bg-rose-500/10 px-2 py-1 rounded-full"><Bell className="w-3 h-3"/> 실패: 계좌확인 필요</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Firm Fee & Tax */}
        <div className="space-y-6">
          <Card className="border-white/10 bg-black/40 backdrop-blur-xl">
            <CardHeader className="pb-2 border-b border-white/5">
              <CardTitle className="text-base text-zinc-200">로펌 지급 (수수료)</CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-zinc-400">수임료 (평균 15%)</span>
                <span className="font-medium text-white">₩2,137,500,000</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-zinc-400">제세공과금 원천징수</span>
                <span className="font-medium text-rose-400">- ₩470,250,000</span>
              </div>
              <div className="flex justify-between items-center text-sm pt-4 border-t border-white/5">
                <span className="font-medium text-zinc-200">순 입금액</span>
                <span className="text-lg font-bold text-emerald-400">₩1,667,250,000</span>
              </div>
              <Button className="w-full mt-2 bg-white text-black hover:bg-zinc-200">
                수임료 법인계좌 환수
              </Button>
            </CardContent>
          </Card>
          
          <Card className="border border-indigo-500/30 bg-indigo-500/5 backdrop-blur-xl">
            <CardContent className="p-4 flex flex-col gap-2">
              <div className="flex items-center gap-2 text-indigo-400 font-medium text-sm">
                <DollarSign className="w-4 h-4" />
                자동 분배 시뮬레이션
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                현재 원고들의 증거 검증 결과와 판별된 배상 등급에 맞춰 개별 지급액을 자동 산정 완료했습니다. 이상이 없다면 일괄 송금을 진행하세요.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
