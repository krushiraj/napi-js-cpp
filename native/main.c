#include "md5.h"

int main()
{
  char str[] = "Krushi Raj Tula";
  const char *hash = GetMD5String(str);
  printf("%s", hash);
  return 0;
}
