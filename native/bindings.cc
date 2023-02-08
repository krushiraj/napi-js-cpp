#include <napi.h>

#include "md5.c"
#include "sum.c"

Napi::String GetMD5StringWrapped(const Napi::CallbackInfo &info)
{
  Napi::Env env = info.Env();
  if (info.Length() == 0)
    return Napi::String::New(env, "No arguments passed");
  Napi::String str = info[0].As<Napi::String>();
  const char *msg = str.Utf8Value().c_str();
  const char *md5 = GetMD5String(msg);
  return Napi::String::New(env, md5);
}

Napi::Number SumWrapped(const Napi::CallbackInfo &info)
{
  Napi::Env env = info.Env();
  if (info.Length() < 1)
    return Napi::Number::New(env, 0);
  int n = info[0].As<Napi::Number>().Int32Value();
  int result = sumOfN(n);
  return Napi::Number::New(env, result);
}

Napi::Object Init(Napi::Env env, Napi::Object exports)
{
  exports.Set(Napi::String::New(env, "getMD5String"),
              Napi::Function::New(env, GetMD5StringWrapped));

  exports.Set(Napi::String::New(env, "sum"),
              Napi::Function::New(env, SumWrapped));

  return exports;
}

NODE_API_MODULE(addon, Init)
