(
 (js-mode
  ;; match airbnb style (following agoric / erights)
  (js2-basic-offset . 2)
  (js-indent-level . 2)
  (js2-indent-switch-body . true)
  )
;; https://www.simplify.ba/articles/2016/02/14/node-modules-bin-in-path/
 (nil . (
         ;; TabsAreEvil
         (indent-tabs-mode . nil)
         (eval . (progn
                   (add-to-list 'exec-path
                                (concat (locate-dominating-file
                                         default-directory ".dir-locals.el")
                                        "node_modules/.bin/")))))))
