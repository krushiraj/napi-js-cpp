#include "sum.h"

int sumOfN(int n)
{
  int i, sum = 0;
  for (i = 0; i < n; i++)
  {
    sum += i;
  }
  return sum;
}

// int main()
// {
//   int n = 100;
//   int sum = sumOfN(n);
//   printf("sum of first %d numbers is %d", n, sum);
//   return 0;
// }