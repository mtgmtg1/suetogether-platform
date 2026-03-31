// [Flow: Login View -> Credentials Submit -> API Auth -> Redirect Dashboard]
import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0A0A0A]">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/20 blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-600/20 blur-[120px]" />
      
      {/* Login Card */}
      <div className="z-10 w-full max-w-md px-4">
        <div className="mb-8 flex flex-col items-center justify-center text-center space-y-2">
          {/* Logo Placeholder */}
          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20 mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-white"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          </div>
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-50">SueTogether</h1>
          <p className="text-sm text-zinc-400">집단분쟁 초자동화 플랫폼 (Firm Workspace)</p>
        </div>

        <Card className="border-white/10 bg-black/40 backdrop-blur-2xl shadow-2xl">
          <CardHeader>
            <CardTitle className="text-xl">법무법인 로그인</CardTitle>
            <CardDescription className="text-zinc-400">테넌트 식별자 및 로그인 정보를 입력하세요.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="tenantId" className="text-zinc-300">Workspace / 로펌 ID</Label>
              <Input 
                id="tenantId" 
                placeholder="예: shin-and-kim" 
                className="bg-white/5 border-white/10 text-white placeholder:text-zinc-500 focus-visible:ring-blue-500 h-11"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email" className="text-zinc-300">이메일 주소</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="attorney@lawfirm.com" 
                className="bg-white/5 border-white/10 text-white placeholder:text-zinc-500 focus-visible:ring-blue-500 h-11"
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-zinc-300">비밀번호</Label>
                <Link href="#" className="text-xs text-blue-400 hover:text-blue-300 transition-colors">
                  비밀번호를 잊으셨나요?
                </Link>
              </div>
              <Input 
                id="password" 
                type="password" 
                className="bg-white/5 border-white/10 text-white focus-visible:ring-blue-500 h-11"
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4 mt-2">
            <Button className="w-full h-11 bg-blue-600 hover:bg-blue-500 text-white font-medium shadow-lg shadow-blue-500/25 transition-all">
              워크스페이스 입장
            </Button>
            <div className="text-center text-sm text-zinc-500">
              시스템 도입 문의: <Link href="#" className="text-zinc-300 hover:text-white underline underline-offset-4 decoration-zinc-700">도입 상담</Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
