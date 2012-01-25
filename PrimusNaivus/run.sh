#!/bin/sh

echo "==========================="
echo "Compiling..."
echo "==========================="

g++ -O2 ./PrimusNaivusCpp.cpp -o ./PrimusNaivusCpp
fsc -O ./PrimusNaivusFSharp.fsx -o ./PrimusNaivusFSharp.exe
gmcs -O ./PrimusNaivusCSharp.cs -out:PrimusNaivusCSharp.exe
javac ./PrimusNaivusJava.java
scalac ./PrimusNaivusScala.scala

echo "==========================="
echo "...done."
echo "==========================="
echo

echo "C++ ======================="
./PrimusNaivusCpp
echo "==========================="
echo

echo "Node ======================"
node ./PrimusNaivusJs.js
echo "==========================="
echo 

echo "JRunScript (Java) ========="
jrunscript ./PrimusNaivusJs.js
echo "==========================="
echo

echo "Jsc ======================="
jsc ./PrimusNaivusJs.js
echo "==========================="
echo

echo "Ruby ======================"
ruby ./PrimusNaivusRuby.rb
echo "==========================="
echo

echo "JRuby ====================="
jruby ./PrimusNaivusRuby.rb
echo "==========================="
echo

echo "CPython ==================="
python ./PrimusNaivusPy.py
echo "==========================="
echo

echo "Pypy ======================"
pypy ./PrimusNaivusPy.py
echo "==========================="
echo

echo "Jython ===================="
jython ./PrimusNaivusPy.py
echo "==========================="
echo

echo "Php ======================="
php ./PrimusNaivusPhp.php
echo "==========================="
echo

echo "F# ========================"
mono ./PrimusNaivusFSharp.exe
echo "==========================="
echo

echo "C# ========================"
mono ./PrimusNaivusCSharp.exe
echo "==========================="
echo

echo "Groovy ===================="
groovy PrimusNaivusGroovy.groovy
echo "==========================="
echo

echo "Fantom ===================="
fan ./PrimusNaivusFantom.fan
echo "==========================="
echo

echo "Java ======================"
java PrimusNaivusJava
echo "==========================="
echo

echo "Scala ======================"
scala PrimusNaivusScala
echo "============================"
echo

echo "Clojure ===================="
clj PrimusNaivusClojure.clj
echo "============================"
echo
