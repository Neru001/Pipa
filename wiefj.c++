#include <iostream>
using namespace std;
int main{
    int a;
    cout << "введите член ";
    cin >> a;

    if (a % 4 == 0 && a % 100 != 0 || a % 400 == 0){
        cout << "Високосный год";
    } else {
        cout << "иди нахуй"
    }
    return 0;
}