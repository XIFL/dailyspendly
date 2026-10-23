import React, { useState } from "react";
import { WalletCards } from "lucide-react";
import { AuthError, MissingIdentityError, login, requestPasswordRecovery, signup, updateUser } from "@netlify/identity";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const TITLES={login:["Welcome back","Log in to see your spending."],signup:["Create your account","Your purchases are saved to your account and available on any device."],forgot:["Reset your password","We'll email you a link to choose a new password."],reset:["Choose a new password","Enter a new password for your account."]};
function describeError(err,mode){if(err instanceof MissingIdentityError)return"Accounts are not available on this site yet.";if(err instanceof AuthError){if(err.status===401)return mode==="login"?"Invalid email or password.":err.message;if(err.status===403)return"New sign-ups are currently disabled.";if(err.status===422)return"Please check your email and password (passwords need at least 6 characters).";return err.message}return"Something went wrong. Please try again."}

export default function AuthScreen({initialMode="login",initialNotice="",onAuthenticated}){
const[mode,setMode]=useState(initialMode),[email,setEmail]=useState(""),[password,setPassword]=useState(""),[name,setName]=useState(""),[error,setError]=useState(""),[notice,setNotice]=useState(initialNotice),[busy,setBusy]=useState(false);
function switchMode(m){setMode(m);setError("");setNotice("")}
async function submit(ev){ev.preventDefault();setError("");setNotice("");setBusy(true);try{
if(mode==="login"){onAuthenticated(await login(email,password))}
else if(mode==="signup"){const user=await signup(email,password,{full_name:name.trim()});if(user.emailVerified)onAuthenticated(user);else{setMode("login");setPassword("");setNotice("Check your email to confirm your account, then log in.")}}
else if(mode==="forgot"){await requestPasswordRecovery(email);setNotice("If an account exists for that email, a reset link is on its way.")}
else if(mode==="reset"){onAuthenticated(await updateUser({password}))}
}catch(err){setError(describeError(err,mode))}finally{setBusy(false)}}
const[title,subtitle]=TITLES[mode];
return <div className="flex min-h-screen items-center justify-center bg-[#f4f7f5] px-4 py-10 text-slate-900"><div className="w-full max-w-md"><div className="mb-6 flex items-center justify-center gap-3"><div className="rounded-2xl bg-emerald-600 p-2.5 text-white"><WalletCards className="h-5 w-5"/></div><div><p className="text-lg font-bold leading-none">Spendly</p><p className="mt-1 text-xs text-slate-500">Make every dollar visible</p></div></div>
<Card className="overflow-hidden rounded-3xl border-0 shadow-xl ring-1 ring-slate-200/70"><div className="bg-slate-900 px-6 py-7 text-white sm:px-8"><h1 className="text-2xl font-bold">{title}</h1><p className="mt-1 text-sm text-slate-300">{subtitle}</p></div><CardContent className="p-6 sm:p-8"><form onSubmit={submit} className="space-y-5">
{mode==="signup"&&<div className="space-y-2"><Label htmlFor="name">Name</Label><Input id="name" autoComplete="name" value={name} onChange={e=>setName(e.target.value)}/></div>}
{mode!=="reset"&&<div className="space-y-2"><Label htmlFor="email">Email</Label><Input id="email" type="email" required autoComplete="email" value={email} onChange={e=>setEmail(e.target.value)}/></div>}
{mode!=="forgot"&&<div className="space-y-2"><div className="flex items-center justify-between"><Label htmlFor="password">{mode==="reset"?"New password":"Password"}</Label>{mode==="login"&&<button type="button" onClick={()=>switchMode("forgot")} className="text-xs font-medium text-emerald-700 hover:underline">Forgot password?</button>}</div><Input id="password" type="password" required minLength={6} autoComplete={mode==="login"?"current-password":"new-password"} value={password} onChange={e=>setPassword(e.target.value)}/></div>}
{error&&<p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>}{notice&&<p className="rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{notice}</p>}
<Button type="submit" disabled={busy} className="h-11 w-full rounded-xl bg-emerald-600 hover:bg-emerald-700">{busy?"Please wait…":mode==="login"?"Log in":mode==="signup"?"Create account":mode==="forgot"?"Send reset link":"Save new password"}</Button>
{mode!=="reset"&&<p className="text-center text-sm text-slate-500">{mode==="signup"?<>Already have an account? <button type="button" onClick={()=>switchMode("login")} className="font-semibold text-emerald-700 hover:underline">Log in</button></>:mode==="login"?<>New to Spendly? <button type="button" onClick={()=>switchMode("signup")} className="font-semibold text-emerald-700 hover:underline">Create an account</button></>:<button type="button" onClick={()=>switchMode("login")} className="font-semibold text-emerald-700 hover:underline">Back to log in</button>}</p>}
</form></CardContent></Card></div></div>}
