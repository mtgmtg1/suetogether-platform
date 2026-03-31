// [Flow: Component Init -> Render Header & Stats -> Render Drag & Drop Zone -> Render Upload List & VLM Status]
"use client";

import { useState } from "react";
import { UploadCloud, FileText, CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type UploadedFile = {
  id: string;
  name: string;
  size: string;
  status: "uploading" | "processing" | "success" | "error";
  progress: number;
};

export default function EvidenceUploadPage() {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<UploadedFile[]>([
    { id: "1", name: "bank_statement_2023.pdf", size: "2.4 MB", status: "success", progress: 100 },
    { id: "2", name: "medical_record_01.jpg", size: "4.1 MB", status: "processing", progress: 45 },
    { id: "3", name: "contract_draft.docx", size: "1.2 MB", status: "error", progress: 100 },
  ]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    // Fake upload for UI preview
    const newFiles = Array.from(e.dataTransfer.files).map((f, i) => ({
      id: `new-${Date.now()}-${i}`,
      name: f.name,
      size: `${(f.size / (1024 * 1024)).toFixed(1)} MB`,
      status: "uploading" as const,
      progress: 0,
    }));
    
    setFiles(prev => [...newFiles, ...prev]);
    
    // Simulate upload progress
    newFiles.forEach((file) => {
      let currentProgress = 0;
      const interval = setInterval(() => {
        currentProgress += Math.random() * 20;
        if (currentProgress >= 100) {
          clearInterval(interval);
          setFiles(prev => prev.map(p => 
            p.id === file.id ? { ...p, progress: 100, status: "processing" } : p
          ));
          
          // Simulate VLM processing to success
          setTimeout(() => {
            setFiles(prev => prev.map(p => 
              p.id === file.id ? { ...p, status: "success" } : p
            ));
          }, 3000);
        } else {
          setFiles(prev => prev.map(p => 
            p.id === file.id ? { ...p, progress: currentProgress } : p
          ));
        }
      }, 500);
    });
  };

  return (
    <div className="space-y-6 pt-4 max-w-5xl mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-white">증거 자료 업로드 & VLM 분석</h1>
          <p className="text-sm text-zinc-400 mt-1">
            원고의 증거 서류를 업로드하세요. VLM 모듈이 자동으로 비정형 데이터를 추출하고 분류합니다.
          </p>
        </div>
        <Button className="bg-white text-black hover:bg-zinc-200">
          모든 결과 확인
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upload Zone */}
        <div className="lg:col-span-2 space-y-6">
          <div 
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-2xl p-12 flex flex-col items-center justify-center text-center transition-all ${
              isDragging 
                ? "border-blue-500 bg-blue-500/10 scale-[1.02]" 
                : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10"
            }`}
          >
            <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center mb-4">
              <UploadCloud className={`w-8 h-8 ${isDragging ? "text-blue-400 animate-bounce" : "text-blue-500"}`} />
            </div>
            <h3 className="text-lg font-medium text-white mb-2">클릭하거나 파일을 드래그하여 업로드</h3>
            <p className="text-sm text-zinc-400 max-w-sm mb-6">
              PDF, JPG, PNG, DOCX 포맷 지원. 한 번에 최대 50MB까지 업로드 가능하며 대형 파일은 백그라운드에서 비동기 처리됩니다.
            </p>
            <Button variant="outline" className="border-white/20 text-white bg-transparent hover:bg-white/5">
              파일 선택하기
            </Button>
          </div>

          {/* File List */}
          <Card className="border-white/10 bg-black/40 backdrop-blur-xl">
            <CardHeader className="pb-3 border-b border-white/5">
              <CardTitle className="text-base font-medium">업로드 현황 및 분석 상태</CardTitle>
            </CardHeader>
            <CardContent className="pt-4 p-0">
              <ul className="divide-y divide-white/5">
                {files.map((file) => (
                  <li key={file.id} className="p-4 flex items-center gap-4 hover:bg-white/5 transition-colors">
                    <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                      <FileText className="w-5 h-5 text-zinc-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center mb-1">
                        <p className="text-sm font-medium text-zinc-200 truncate pr-4">{file.name}</p>
                        <span className="text-xs text-zinc-500">{file.size}</span>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full transition-all duration-300 ${
                              file.status === "error" ? "bg-rose-500" :
                              file.status === "success" ? "bg-emerald-500" :
                              "bg-blue-500"
                            }`}
                            style={{ width: `${file.progress}%` }}
                          />
                        </div>
                        <span className="text-[10px] uppercase font-medium w-20 text-right">
                          {file.status === "uploading" && <span className="text-blue-400">업로드 중</span>}
                          {file.status === "processing" && <span className="text-amber-400 flex items-center justify-end gap-1"><Loader2 className="w-3 h-3 animate-spin"/> VLM 분석중</span>}
                          {file.status === "success" && <span className="text-emerald-400 flex items-center justify-end gap-1"><CheckCircle2 className="w-3 h-3"/> 추출 완료</span>}
                          {file.status === "error" && <span className="text-rose-400 flex items-center justify-end gap-1"><AlertCircle className="w-3 h-3"/> 손상된 파일</span>}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Status Panel */}
        <div className="space-y-6">
          <Card className="border-white/10 bg-black/40 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-lg">VLM 처리 통계</CardTitle>
              <CardDescription className="text-zinc-400">가습기 살균제 집단소송 건</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center p-3 rounded-xl bg-white/5 border border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                  <span className="text-sm text-zinc-300">대기 중인 문서</span>
                </div>
                <span className="font-semibold text-white">12건</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-xl bg-white/5 border border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-amber-500" />
                  <span className="text-sm text-zinc-300">OCR 분석 실패율</span>
                </div>
                <span className="font-semibold text-white">1.2%</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-xl bg-white/5 border border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="text-sm text-zinc-300">평균 처리 시간</span>
                </div>
                <span className="font-semibold text-white">4.5초</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
