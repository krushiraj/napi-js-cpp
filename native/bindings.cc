#include <napi.h>

Napi::Object Init(Napi::Env env, Napi::Object exports)
{
  exports.Set(Napi::String::New(env, "sum"),
              Napi::String::New(env, "Sum"));

  return exports;
}

NODE_API_MODULE(addon, Init)
