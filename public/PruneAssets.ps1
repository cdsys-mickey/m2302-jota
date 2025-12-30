# ================= 設定區 =================
$TargetPrefix = "main-"       # 要清理的檔案開頭
$KeepCount    = 2             # 保留的代數
$AssetsPath   = "./assets"    # Assets 目錄路徑
# ==========================================

if (Test-Path $AssetsPath) {
    Write-Host "--- 正在清理 $AssetsPath 內的歷史檔案 ---" -ForegroundColor Cyan

    # 1. 取得符合開頭的檔案並依副檔名分組 (JS/CSS 分開計算)
    $groupedFiles = Get-ChildItem -Path $AssetsPath -File | 
                    Where-Object { $_.Name.StartsWith($TargetPrefix) } | 
                    Group-Object Extension

    $deleteCount = 0

    foreach ($group in $groupedFiles) {
        # 2. 依時間排序（最新在前）並跳過前 $KeepCount 個
        $filesToDelete = $group.Group | Sort-Object LastWriteTime -Descending | Select-Object -Skip $KeepCount

        if ($filesToDelete) {
            foreach ($file in $filesToDelete) {
                try {
                    $fileName = $file.Name
                    $fileTime = $file.LastWriteTime.ToString("yyyy/MM/dd HH:mm")
                    Remove-Item -Path $file.FullName -Force
                    Write-Host "🗑️ 已刪除: $fileName (日期: $fileTime)" -ForegroundColor Gray
                    $deleteCount++
                }
                catch {
                    Write-Warning "❌ 無法刪除 $($file.Name)"
                }
            }
        }
    }

    if ($deleteCount -eq 0) {
        Write-Host "✅ 沒有舊檔案需要清理。" -ForegroundColor Green
    } else {
        Write-Host "✨ 清理完成，共刪除 $deleteCount 個檔案。" -ForegroundColor Green
    }
} else {
    Write-Warning "⚠️ 找不到目錄: $AssetsPath"
}

# 暫停輸出，等待使用者按任意鍵結束
Write-Host "`n按任意鍵繼續..." -ForegroundColor Yellow
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")