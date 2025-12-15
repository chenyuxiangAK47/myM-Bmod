# 查找 Bannerlord 日志文件
# 通常位置：Documents\Mount and Blade II Bannerlord\Logs

$searchPaths = @(
    "$env:USERPROFILE\Documents\Mount and Blade II Bannerlord\Logs",
    "$env:USERPROFILE\Documents\Mount & Blade II Bannerlord\Logs",
    "$env:LOCALAPPDATA\Mount and Blade II Bannerlord\Logs",
    "$env:LOCALAPPDATA\Mount & Blade II Bannerlord\Logs"
)

Write-Host "正在查找 Bannerlord 日志文件..." -ForegroundColor Green

foreach ($path in $searchPaths)
{
    if (Test-Path $path)
    {
        Write-Host "`n找到日志目录: $path" -ForegroundColor Yellow
        $logs = Get-ChildItem $path -Filter "*.log" -ErrorAction SilentlyContinue | 
                Where-Object { $_.LastWriteTime -ge (Get-Date "2025-12-15") -and $_.LastWriteTime -lt (Get-Date "2025-12-16") } |
                Sort-Object LastWriteTime -Descending
        
        if ($logs)
        {
            Write-Host "找到 $($logs.Count) 个 12/15 的日志文件:" -ForegroundColor Green
            $logs | Format-Table Name, Length, LastWriteTime -AutoSize
            
            # 查找包含快速开始相关信息的日志
            Write-Host "`n搜索包含 '快速开始' 或 'QuickStart' 的日志..." -ForegroundColor Cyan
            foreach ($log in $logs)
            {
                $content = Get-Content $log.FullName -ErrorAction SilentlyContinue | Select-String -Pattern "快速开始|QuickStart|NordThrowingAxeMod|Harmony" -CaseSensitive:$false
                if ($content)
                {
                    Write-Host "`n在 $($log.Name) 中找到相关内容:" -ForegroundColor Yellow
                    $content | Select-Object -First 10
                }
            }
        }
        else
        {
            Write-Host "  未找到 12/15 的日志文件" -ForegroundColor Gray
        }
    }
}

Write-Host "`n搜索完成" -ForegroundColor Green


