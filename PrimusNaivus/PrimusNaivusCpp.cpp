#include <iostream>
#include <vector>
#include <time.h>

using namespace std;

double diffclock(clock_t clock1, clock_t clock2)
{
    double diffticks = clock1 - clock2;
    double diffms = (diffticks * 1000) / CLOCKS_PER_SEC;
    return diffms;
} 

bool is_prime(int x, vector<int> &primes)
{
    for (vector<int>::iterator it = primes.begin(); it != primes.end(); ++it)
        if (x % *it == 0)
            return false;
    return true;
}

vector<int> find_primes(int index)
{
    vector<int> primes;
    for (int candidate = 2; primes.size() < index; candidate++)
        if (is_prime(candidate, primes))
            primes.push_back(candidate);
    return primes;
}

int main(int argc, char** argv) 
{
    // warm-up
    find_primes(500);

    clock_t tic = clock();
    vector<int> primes = find_primes(5555);
    clock_t toc = clock();

    double elapsed = diffclock(toc, tic);
    cout << "Elapsed time: " << elapsed << " msecs\n";
	cout << primes.back() << "\n";

    return 0;
}
