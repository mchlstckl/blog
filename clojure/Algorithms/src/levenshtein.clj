(ns algorithms.levenshtein)

;; Version 1 ;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(defn- init-distance [m n]
  "Create initial distance matrix [i 0] => i, [0 j] => j"
  (reduce #(assoc %1 %2 (apply max %2)) {}
    (concat
      '([0 0])
      (for [i (range 1 (inc m))] [i 0])
      (for [j (range 1 (inc n))] [0 j]))))

(defn levenshtein-distance1 [source target]
  "http://en.wikipedia.org/wiki/Levenshtein_distance"
  (let [m (count source)
        n (count target)]
    (loop [j 1
           i 1
           d (init-distance m n)]
      (cond
        (> j n) (d [m n])
        (> i m) (recur (inc j) 1 d)
        (= (get source (dec i)) (get target (dec j))) (recur j (inc i) (assoc d [i j] (d [(dec i) (dec j)])))
        :else (recur j (inc i) (assoc d [i j] (inc (min
                                                     (d [(dec i) j])
                                                     (d [i (dec j)])
                                                     (d [(dec i) (dec j)])))))))))


;; Version 2 ;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(def dist (memoize (fn [pred index] (let [[i j] index]
                                      (cond
                                        (zero? (min i j)) (max i j)
                                        (pred index) (dist pred [(dec i) (dec j)])
                                        :else (inc (min
                                                     (dist pred [(dec i) j])
                                                     (dist pred [i (dec j)])
                                                     (dist pred [(dec i) (dec j)]))))))))

(defn levenshtein-distance2 [source target]
  (let [pred (fn [index] (let [[i j] index]
                           (=
                             (get source (dec i))
                             (get target (dec j)))))]
    (->> (for [j (range (count target))
               i (range (count source))]
           [i j])
      (map (partial dist pred))
      last)))


;; Version 3 ;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
(defn dist-step [pred d index]
  (let [[i j] index]
    (assoc d [i j]
      (cond
        (zero? (min i j)) (max i j)
        (pred index) (d [(dec i) (dec j)])
        :else (inc (min
                     (d [(dec i) j])
                     (d [i (dec j)])
                     (d [(dec i) (dec j)])))))))

(defn levenshtein-distance3 [source target]
  (let [m (count source)
        n (count target)
        pred (fn [index] (let [[i j] index]
                           (=
                             (get source (dec i))
                             (get target (dec j)))))
        step (partial dist-step pred)
        dist (reduce step {} (for [j (range n) i (range m)] [i j]))]
    (dist [(dec m) (dec n)])))

(levenshtein-distance3 "sitting" "kitten")



